import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import WebSocket, { Server as WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { TeamRequestBody, QuestionRequestBody, LoginRequestBody } from './interfaces';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const wss = new WebSocketServer({ port: 8080 });

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/lock-all-teams', async (req: Request, res: Response) => {
    try {
        await prisma.team.updateMany({
            data: { locked: true }
        });
        res.status(200).json({ message: 'All teams locked successfully.' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.post('/unlock-all-teams', async (req: Request, res: Response) => {
    try {
        await prisma.team.updateMany({
            data: { locked: false }
        });
        res.status(200).json({ message: 'All teams unlocked successfully.' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.post('/register-team', async (req: Request<{}, {}, TeamRequestBody>, res: Response) => {
    const { team_name, team_password, users } = req.body;
    try {
        const existingTeam = await prisma.team.findUnique({
            where: { team_name },
        });
        if (existingTeam) {
            return res.status(400).json({ error: 'Team name already exists' });
        }

        const newTeam = await prisma.team.create({
            data: {
                team_name,
                team_password,
                users: {
                    create: users.map(user => ({
                        EnrollNo: user.EnrollNo,
                        name: user.name,
                    }))
                }
            },
            include: {
                users: true
            }
        });
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ error: 'User in another team' });
    }
});

app.post('/add-question', async (req: Request<{}, {}, QuestionRequestBody>, res: Response) => {
    const { question_text, question_description, answer } = req.body;
    try {
        const question = await prisma.question.create({
            data: {
                question_id: crypto.randomUUID(),
                question_text,
                question_description,
                answer
            }
        });
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

app.post('/login-team', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { team_name, team_password } = req.body;
    try {
        const team = await prisma.team.findUnique({
            where: { team_name },
            select: {
                team_name: true,
                team_password: true
            }
        });
        if (!team) {
            return res.status(401).json({ error: 'Invalid team name or password' });
        }
        const validPassword = team.team_password === team_password;
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid team name or password' });
        }
        res.status(200).json({ message: 'Login successful', team_name: team.team_name });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.post('/submit-answer', async (req: Request<{}, {}, { team_name: string; question_id: string; answer: string }>, res: Response) => {
    const { team_name, question_id, answer } = req.body;
    try {
        const team = await prisma.team.findUnique({ where: { team_name } });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        const teamProgress = await prisma.teamProgress.findFirst({
            where: { team_name, question_id },
            include: { question: true }
        });
        if (teamProgress) {
            if (teamProgress.is_completed) {
                return res.status(400).json({ message: 'This team has already submitted the correct answer for this question.' });
            }
            if (teamProgress.question.answer.toLowerCase() === answer.toLowerCase()) {
                await prisma.teamProgress.update({
                    where: { progress_id: teamProgress.progress_id },
                    data: { is_completed: true, solved_at: new Date() }
                });
                return res.status(200).json({ message: 'Correct answer! Question marked as completed.' });
            }
            return res.status(400).json({ message: 'Incorrect answer.' });
        }
        const question = await prisma.question.findUnique({ where: { question_id } });
        if (!question) {
            return res.status(404).json({ message: 'Question not found.' });
        }
        if (question.answer.toLowerCase() === answer.toLowerCase()) {
            await prisma.teamProgress.create({
                data: {
                    progress_id: uuidv4(),
                    team_name,
                    question_id,
                    is_completed: true,
                    solved_at: new Date()
                }
            });
            return res.status(201).json({ message: 'Correct answer! Question marked as completed.' });
        }
        return res.status(400).json({ message: 'Incorrect answer.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/get-questions', async (req: Request, res: Response) => {
    try {
        const questions = await prisma.question.findMany({
            select: {
                question_id: true,
                question_text: true,
                question_description: true
            }
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


app.post('/unsolved-questions', async (req: Request<{}, {}, { team_name: string }>, res: Response) => {
    const { team_name } = req.body;
    try {
        const team = await prisma.team.findUnique({
            where: { team_name }
        });

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        const solvedQuestions = await prisma.teamProgress.findMany({
            where: { team_name, is_completed: true },
            select: { question_id: true }
        });
        const solvedQuestionIds = solvedQuestions.map((tp: { question_id: string }) => tp.question_id);
        const unsolvedQuestions = await prisma.question.findMany({
            where: {
                NOT: {
                    question_id: {
                        in: solvedQuestionIds
                    }
                }
            },
            select: {
                question_id: true,
                question_text: true,
                question_description: true
            }
        });
        const extractNumber = (text: string): number => {
            return parseInt(text, 10);
        };
        unsolvedQuestions.sort((a: any, b: any) => extractNumber(a.question_text) - extractNumber(b.question_text));

        res.status(200).json(unsolvedQuestions);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});



app.post('/toggle-team-lock', async (req: Request, res: Response) => {
    const { team_name } = req.body;
    try {
        const team = await prisma.team.findUnique({
            where: { team_name },
            select: { locked: true }
        });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        const newLockStatus = !team.locked;
        await prisma.team.update({
            where: { team_name },
            data: { locked: newLockStatus }
        });
        res.status(200).json({ message: `Team ${team_name} has been ${newLockStatus ? 'locked' : 'unlocked'}.` });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.post('/team-locked', async (req: Request<{}, {}, { team_name: string }>, res: Response) => {
    const { team_name } = req.body;
    try {
        const team = await prisma.team.findUnique({
            where: { team_name },
            select: { locked: true }
        });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(200).json({ team_name, locked: team.locked });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.get('/get-hints', async (req: Request, res: Response) => {
    try {
        const hints = await prisma.hint.findMany({
            select: {
                id: true,
                hintText: true,
                createdAt: true
            }
        });
        res.status(200).json(hints);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.get('/get-teams', async (req: Request, res: Response) => {
    try {
        // Get all teams with their completed progress
        const teams = await prisma.team.findMany({
            include: {
                users: true,
                team_progress: {
                    where: {
                        is_completed: true
                    }
                }
            }
        });

        // Filter teams that completed ALL 15 questions
        const completedTeams = teams.filter(team => team.team_progress.length === 15);

        // Map teams with their completion time of Question 15
        const teamsWithProgress = await Promise.all(
            completedTeams.map(async (team) => {
                // Get Question 15 completion time for ranking
                const q15Progress = await prisma.teamProgress.findFirst({
                    where: {
                        team_name: team.team_name,
                        is_completed: true,
                        question: {
                            question_text: 'Question 15'
                        }
                    }
                });

                return {
                    team_name: team.team_name,
                    completed_questions: 15,
                    solved_at: q15Progress?.solved_at || new Date(),
                    users: team.users.map((user: any) => ({
                        EnrollNo: user.EnrollNo,
                    }))
                };
            })
        );

        // Sort by completion time of Question 15 (earliest first)
        teamsWithProgress.sort((a, b) => 
            new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime()
        );

        // Add rank numbers
        const result = teamsWithProgress.map((team, index) => ({
            rank: index + 1,
            ...team
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Get all registered teams with their login credentials
app.get('/all-teams', async (req: Request, res: Response) => {
    try {
        const teams = await prisma.team.findMany({
            include: {
                users: {
                    select: {
                        name: true,
                        EnrollNo: true
                    }
                },
                team_progress: {
                    where: {
                        is_completed: true
                    },
                    select: {
                        question_id: true
                    }
                }
            },
            orderBy: {
                team_name: 'asc'
            }
        });

        const result = teams.map(team => ({
            team_name: team.team_name,
            team_password: team.team_password,
            locked: team.locked,
            total_members: team.users.length,
            members: team.users,
            questions_completed: team.team_progress.length,
            status: team.team_progress.length === 15 ? 'Completed All' : 
                    team.team_progress.length > 0 ? 'In Progress' : 'Not Started'
        }));

        res.status(200).json({
            total_teams: result.length,
            teams: result
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Get teams that started but did not finish (1-14 questions completed)
app.get('/incomplete-teams', async (req: Request, res: Response) => {
    try {
        const teams = await prisma.team.findMany({
            include: {
                users: {
                    select: {
                        name: true,
                        EnrollNo: true
                    }
                },
                team_progress: {
                    where: {
                        is_completed: true
                    },
                    include: {
                        question: {
                            select: {
                                question_text: true,
                                question_description: true
                            }
                        }
                    },
                    orderBy: {
                        solved_at: 'desc'
                    }
                }
            }
        });

        // Filter teams that have started (1-14 questions) but not finished
        const incompleteTeams = teams.filter(team => 
            team.team_progress.length > 0 && team.team_progress.length < 15
        );

        const result = incompleteTeams.map(team => {
            const lastSolved = team.team_progress[0]; // Most recent due to orderBy desc
            
            return {
                team_name: team.team_name,
                members: team.users,
                questions_completed: team.team_progress.length,
                questions_remaining: 15 - team.team_progress.length,
                last_solved_question: lastSolved ? lastSolved.question.question_text : null,
                last_solved_at: lastSolved ? lastSolved.solved_at : null,
                progress_percentage: Math.round((team.team_progress.length / 15) * 100)
            };
        });

        // Sort by progress (most progress first)
        result.sort((a, b) => b.questions_completed - a.questions_completed);

        res.status(200).json({
            total_incomplete_teams: result.length,
            teams: result
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// ⚠️ DANGER: Delete all user data from database
// Requires confirmation parameter to prevent accidental deletion
app.delete('/delete-all-data', async (req: Request, res: Response) => {
    try {
        const { confirm } = req.body;
        
        // Require explicit confirmation
        if (confirm !== 'DELETE_ALL_DATA') {
            return res.status(400).json({ 
                error: 'Confirmation required',
                message: 'Send { "confirm": "DELETE_ALL_DATA" } in request body to proceed'
            });
        }

        // Delete in correct order to respect foreign key constraints
        console.log('🗑️ Deleting all data...');
        
        // Delete team progress first (has foreign keys to teams and questions)
        const deletedProgress = await prisma.teamProgress.deleteMany();
        console.log(`✅ Deleted ${deletedProgress.count} team progress records`);

        // Delete users (has foreign key to teams)
        const deletedUsers = await prisma.user.deleteMany();
        console.log(`✅ Deleted ${deletedUsers.count} users`);

        // Delete teams
        const deletedTeams = await prisma.team.deleteMany();
        console.log(`✅ Deleted ${deletedTeams.count} teams`);

        // Delete hints
        const deletedHints = await prisma.hint.deleteMany();
        console.log(`✅ Deleted ${deletedHints.count} hints`);

        // Note: Questions are NOT deleted to preserve quiz structure
        
        res.status(200).json({
            success: true,
            message: 'All user data has been deleted',
            deleted: {
                teams: deletedTeams.count,
                users: deletedUsers.count,
                team_progress: deletedProgress.count,
                hints: deletedHints.count
            },
            note: 'Questions were preserved for quiz structure'
        });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: (error as Error).message });
    }
});

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    ws.on('message', async (message: string) => {
        const data = JSON.parse(message);

        if (data.type === 'hint') {
            const hintText = data.hintText;
            if (typeof hintText !== 'string' || hintText.trim() === '') {
                console.error('Invalid hintText:', hintText);
                return ws.send(JSON.stringify({ error: 'Invalid hintText provided' }));
            }
            try {
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'hint', hint: hintText }));
                    }
                });

                await prisma.hint.create({
                    data: { hintText }
                });
            } catch (error) {
                console.error('Error saving hint:', error);
                ws.send(JSON.stringify({ error: 'Failed to save hint' }));
            }
        }


        if (data.type === 'lock' || data.type === 'unlock') {
            const isLocking = data.type === 'lock';
            const teamName = data.team_name;
            try {
                await prisma.team.update({
                    where: { team_name: teamName },
                    data: { locked: isLocking }
                });
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: data.type, team_name: teamName, message: `Team ${teamName} ${isLocking ? 'locked' : 'unlocked'}!` }));
                    }
                });
            } catch (error) {
                console.error(`Error ${data.type} team:`, error);
                ws.send(JSON.stringify({ message: `Failed to ${data.type} team ${teamName}` }));
            }
        }

        if (data.type === 'lock_all' || data.type === 'unlock_all') {
            const isLockingAll = data.type === 'lock_all';
            try {
                await prisma.team.updateMany({
                    data: { locked: isLockingAll }
                });
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: data.type, message: `All teams ${isLockingAll ? 'locked' : 'unlocked'}!` }));
                    }
                });
            } catch (error) {
                console.error(`Error ${data.type} all teams:`, error);
                ws.send(JSON.stringify({ message: `Failed to ${data.type} all teams` }));
            }
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
