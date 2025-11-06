// Script to add Transformer Prime Story Questions and manage locks
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function setupQuestions() {
    try {
        console.log('⚠️  WARNING: This script will unlock all teams but preserve all data!');
        console.log('🔓 Unlocking all teams...');
        await prisma.team.updateMany({
            data: { locked: false }
        });
        console.log('✅ All teams unlocked!');

        console.log('\n⚙️ Adding Transformer Prime Story Quiz questions...');

        const questions = [
            {
                question_id: uuidv4(),
                question_text: 'Mission 1: The Energon Equation',
                question_description: 'Optimus Prime stands before a locked Energon Gate glowing with red digits. The panel reads: “Enter the sum that balances the power flow between the four energy rods — 2 + 2.” What number unlocks the gate?',
                answer: '4'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 2: Age of the Primes',
                question_description: 'Optimus Prime is 5 times older than his young apprentice, Bumblebee. In 20 years, Optimus will be only twice as old as Bumblebee. How old is Bumblebee now? (Answer: round to nearest whole number)',
                answer: '7'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 3: Energon Repair',
                question_description: 'Optimus can repair the Energon generator in 12 days. Bumblebee can do it in 12 days. Ratchet takes 24 days. They work together for 3 days, then Ratchet leaves for another mission. How many more days will Optimus and Bumblebee need to finish the remaining work?',
                answer: '3'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 4: The Alliance Greeting',
                question_description: 'At an Autobot peace summit, every bot greets every other bot exactly once with an energon handshake. Ratchet counted exactly 45 handshakes in total. How many Autobots attended the summit?',
                answer: '10'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 5: The Titan of Space',
                question_description: 'Deep in Cybertron’s archives, Ultra Magnus finds a holo-record. “The largest planet near Earth holds Energon storms that could power a Prime,” he notes. Which planet is the largest in the human solar system?',
                answer: 'Jupiter'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 6: The Power Grid',
                question_description: 'Wheeljack examines the power grid readout. "The reactor needs 10 multiplied by 10 units of energy," he explains. How much total energy is needed?',
                answer: '100'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 7: The Language Core',
                question_description: 'Ratchet scans the Autobot base server logs and smiles. “This whole system runs on human code — the same language used for this very app.” What language is it written in?',
                answer: 'Javascript'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 8: The Repair Team',
                question_description: 'Three Autobots need to repair the base. Optimus can finish it alone in 10 days, Bumblebee in 12 days, and Ratchet in 15 days. They all start working together, but Optimus leaves after 2 days, and Bumblebee leaves 3 days before the work is finished. How many total days does it take to complete the repair?',
                answer: '5'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 9: The Family Count',
                question_description: 'Ratchet discovers a family puzzle: "There are 7 men. Each man has 7 wives. Each man and each wife has 7 children." How many people are there in total?',
                answer: '63'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 10: The Continental Circuit',
                question_description: 'Ratchet displays a hologram of Earth with glowing regions. “Each one carries unique energy signatures,” he says. “Count them all — how many main continents exist on this planet?”',
                answer: '7'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 11: The Shadow Count',
                question_description: 'Ratchet poses a logic puzzle: "If there are 12 months in a year, and only 7 of them have 31 days, how many months have 28 days?" Think carefully, Autobot.',
                answer: '12'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 12: The Network Protocol',
                question_description: 'Ratchet connects to the human internet through a coded gateway. He reads aloud: “HTTP active… transmission complete.” What does HTTP stand for?',
                answer: 'HyperText Transfer Protocol'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 13: The Encrypted Sequence',
                question_description: 'Megatron\'s vault displays a cryptic numerical lock: "These numbers share a unique property - they are only divisible by 1 and themselves. The sequence reads: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47..." Soundwave interrupts: "Decepticons, input the 16th number in this sequence to breach the vault!" What is the answer?',
                answer: '53'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 14: Three in a Row',
                question_description: 'Wheeljack discovers an Energon signal encrypted in mathematics. "Three consecutive numbers align in sequence, and their combined power equals 51," he calculates. What is the middle number in this sequence?',
                answer: '17'
            },
            {
                question_id: uuidv4(),
                question_text: 'Mission 15: The Golden Alloy',
                question_description: 'In the lab, Wheeljack refines a shining metal used in ancient Cybertronian armor. The humans call this metal “gold.” What is its chemical symbol?',
                answer: 'Au'
            }
        ];

        // Check if questions already exist
        const existingQuestions = await prisma.question.findMany();

        if (existingQuestions.length > 0) {
            console.log(`⚠️  Found ${existingQuestions.length} existing questions in database.`);
            console.log('🔄 Deleting old questions and adding new ones...');
            
            // First delete all team progress to avoid foreign key issues
            const deletedProgress = await prisma.teamProgress.deleteMany();
            console.log(`✅ Deleted ${deletedProgress.count} team progress records`);
            
            // Now delete old questions
            await prisma.question.deleteMany();
            console.log('✅ Old questions deleted!');
        }
        
        console.log('📝 Adding new Transformer Prime story questions...');
        for (const question of questions) {
            await prisma.question.create({
                data: question
            });
            console.log(`✅ Added: ${question.question_text}`);
        }
        console.log(`\n✅ Successfully added ${questions.length} questions!`);

        console.log('\n🎉 Setup complete!');
        console.log(`✅ Added ${questions.length} questions`);
        console.log('✅ All teams unlocked');

        // Show current status
        const totalQuestions = await prisma.question.count();
        const totalTeams = await prisma.team.count();
        const lockedTeams = await prisma.team.count({ where: { locked: true } });

        console.log('\n📊 Database Status:');
        console.log(`   Questions: ${totalQuestions}`);
        console.log(`   Teams: ${totalTeams}`);
        console.log(`   Locked Teams: ${lockedTeams}`);
        console.log(`   Unlocked Teams: ${totalTeams - lockedTeams}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

setupQuestions();
