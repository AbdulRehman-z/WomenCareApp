// ==========================================
// WOMEN'S CARE APP - CONTENT
// Categories -> sub-options -> information pages
// ==========================================

export type Section = [string, string | string[]]

export interface Category {
    icon: string
    title: string
    subtitle: string
    prompt: string
}

export interface Topic {
    category: string
    icon: string
    label: string
    title: string
    subtitle: string
    intro: string
    sections: Section[]
    warning: string
}

export const CATEGORIES: Record<string, Category> = {

    exercise: {
        icon: "🏃‍♀️",
        title: "Exercise & Movement",
        subtitle: "Safe movement for every stage",
        prompt: "Choose a Stage"
    },

    pain: {
        icon: "🦴",
        title: "MSK Pain & Posture",
        subtitle: "Muscle, joint and body-position advice",
        prompt: "Choose a Problem or Topic"
    },

    emotional: {
        icon: "🧠",
        title: "Emotional Well-being",
        subtitle: "Looking after your mind, family and relationships",
        prompt: "Choose a Topic"
    },

    nutrition: {
        icon: "🥗",
        title: "Nutrition",
        subtitle: "Eating well before, during and after pregnancy",
        prompt: "Choose a Topic"
    },

    baby: {
        icon: "👶",
        title: "Baby Care",
        subtitle: "Practical guidance for the early weeks and months",
        prompt: "Choose a Topic"
    },

    pregnancy: {
        icon: "🤰",
        title: "Pregnancy",
        subtitle: "From pregnancy changes to postpartum healing",
        prompt: "Choose a Topic"
    }

};


export const TOPICS: Record<string, Topic> = {};


// Helper: register one information page.
// sections = [ [heading, "paragraph" | ["bullet", "bullet"]], ... ]

function addTopic(id: string, category: string, icon: string, label: string, intro: string, sections: Section[], warning?: string) {

    TOPICS[id] = {
        category: category,
        icon: icon,
        label: label,
        title: label,
        subtitle: CATEGORIES[category].title,
        intro: intro,
        sections: sections,
        warning: warning || ""
    };

}


export const GENERAL_NOTE =
    "Every woman's health needs are different. This information is general " +
    "guidance and does not replace advice from a qualified healthcare professional.";


// ==========================================
// EXERCISE & PHYSICAL HEALTH
// ==========================================

addTopic("before", "exercise", "🌱", "Before Pregnancy",
    "Preparing for pregnancy is an important step toward a healthy pregnancy and a healthy baby.",
    [
        ["Start healthy lifestyle habits",
            "Eat a balanced diet with fruit, vegetables, whole grains, protein and healthy fats. Drink enough water and stay regularly active."],
        ["Build a regular exercise routine",
            ["Aim for around 150 minutes of moderate activity each week, such as brisk walking, swimming or cycling.",
             "Add strength work twice a week for legs, back, core and arms.",
             "Include stretching and mobility to keep joints flexible."]],
        ["Take folic acid",
            "Folic acid is important before and during early pregnancy. Ask a healthcare professional about the right amount for you."],
        ["Maintain a healthy weight",
            "Being very underweight or overweight can affect pregnancy health. Small, steady changes are best."],
        ["Avoid harmful substances",
            "Avoid smoking, alcohol and other harmful substances when planning pregnancy."],
        ["Review medicines",
            "Discuss any medicines or supplements with your healthcare professional before becoming pregnant."],
        ["Visit a healthcare professional",
            "A pre-pregnancy consultation can identify health, nutritional and lifestyle factors that may affect pregnancy."]
    ]);


addTopic("during", "exercise", "🤰", "During Pregnancy",
    "For most healthy pregnancies, staying active is safe and beneficial. It can ease backache, improve sleep and mood, and help prepare your body for labour.",
    [
        ["Good types of exercise",
            ["Walking", "Swimming and water exercise", "Stationary cycling", "Antenatal yoga or Pilates with a trained instructor", "Gentle strength exercises", "Pelvic floor exercises"]],
        ["How hard should I work?",
            "Use the talk test: you should be able to hold a conversation while exercising. If you are too breathless to talk, slow down."],
        ["Things to avoid",
            ["Contact sports and activities with a risk of falling or impact",
             "Lying flat on your back for long periods in later pregnancy",
             "Exercising in very hot or humid conditions",
             "Scuba diving",
             "Holding your breath while straining"]],
        ["Listen to your body",
            ["Drink water before, during and after exercise.",
             "Wear a supportive bra and comfortable shoes.",
             "Warm up and cool down every time.",
             "Rest when you feel tired. Pregnancy is not the time to push limits."]],
        ["Changes to expect",
            "Hormones such as relaxin make ligaments looser, and your balance changes as your bump grows. Move smoothly, avoid sudden twisting and avoid deep over-stretching."]
    ],
    "Stop exercising and seek medical advice if you have vaginal bleeding, leaking fluid, dizziness, chest pain, severe headache, calf pain or swelling, regular painful contractions, or reduced baby movements.");


addTopic("after", "exercise", "👶", "After Delivery",
    "Your body has done something remarkable. Recovery takes time, and gentle, gradual movement helps healing.",
    [
        ["The first days and weeks",
            ["Walk short distances around the house and build up slowly.",
             "Start gentle pelvic floor squeezes and deep breathing as soon as it feels comfortable.",
             "Rest whenever the baby sleeps."]],
        ["After a caesarean birth",
            ["You have had major abdominal surgery, so go slowly.",
             "Support your wound with a pillow or folded towel when you cough, laugh or get up.",
             "Avoid lifting anything heavier than your baby for the first 6 weeks, unless advised otherwise.",
             "Roll onto your side before sitting up from lying."]],
        ["Rebuilding core strength",
            "Many women have a gap between the stomach muscles (diastasis recti). Begin with deep abdominal breathing and gentle core engagement. Avoid sit-ups and crunches until you have been checked by a physiotherapist."],
        ["Returning to impact exercise",
            "Running, jumping and heavy lifting are best delayed until about 12 weeks, and only when you have no leaking, heaviness or pain. A women's health physiotherapist can guide you."],
        ["Build up gradually",
            ["Weeks 0 to 6: walking, breathing, pelvic floor.",
             "Weeks 6 to 12: low-impact exercise, swimming (after bleeding stops), gentle strength.",
             "After 12 weeks: gradual return to impact and heavier training."]]
    ],
    "Seek advice if you have heavy bleeding, fever, a wound that is red or leaking, leg pain or swelling, bulging or heaviness in the vagina, or ongoing leaking of urine or stool.");


addTopic("pelvic", "exercise", "🧘‍♀️", "Pelvic Floor Exercises",
    "The pelvic floor is a hammock of muscles supporting the bladder, bowel and womb. Strong, well-coordinated pelvic floor muscles help prevent leaking and support your body in pregnancy and after birth.",
    [
        ["How to find the muscles",
            "Imagine you are trying to stop passing wind and stop the flow of urine at the same time. You should feel a gentle squeeze and lift inside. Do not tighten your buttocks, thighs or hold your breath."],
        ["Long squeezes",
            ["Squeeze and lift the muscles, and hold for up to 10 seconds.",
             "Relax fully for 4 seconds.",
             "Repeat up to 10 times."]],
        ["Quick squeezes",
            "Squeeze and lift quickly, then let go. Repeat up to 10 times. These help when you cough, sneeze or laugh."],
        ["How often?",
            "Do a set of long and quick squeezes 3 times a day. Link it to a daily habit such as brushing your teeth or feeding the baby."],
        ["Use the Knack",
            "Squeeze your pelvic floor just before you cough, sneeze, lift or jump to reduce leaking."],
        ["Relaxation matters too",
            "Fully letting go is as important as squeezing. Practise slow belly breathing: as you breathe in, let the belly and pelvic floor soften and drop."],
        ["Good bladder and bowel habits",
            ["Do not strain on the toilet.",
             "Sit with your feet on a small stool and lean forward.",
             "Avoid going 'just in case' too often.",
             "Eat fibre and drink enough water to avoid constipation."]]
    ],
    "See a women's health physiotherapist if you leak urine or stool, feel heaviness or a bulge in the vagina, have pain with intimacy, or cannot feel the muscles working.");


addTopic("posturebody", "exercise", "🧍‍♀️", "Posture & Body Mechanics",
    "How you stand, sit, carry and move affects your back, pelvis and joints. Small changes protect your body through pregnancy and while caring for a baby.",
    [
        ["Standing posture",
            ["Feet hip-width apart, weight evenly on both feet.",
             "Knees soft, not locked.",
             "Gently lengthen up through the spine and keep your ribs over your pelvis.",
             "Relax your shoulders and avoid pushing the bump forward."]],
        ["Moving smoothly",
            ["Change position often. Avoid standing or sitting for long periods.",
             "Turn your whole body, moving your feet, rather than twisting your back.",
             "Keep your knees together when turning in bed or getting out of a car."]],
        ["Carrying a baby",
            ["Keep the baby close to your body.",
             "Switch sides often so one side is not overloaded.",
             "Avoid resting the baby on one hip for long periods."]],
        ["Bending and lifting",
            "Bend your knees and hips, keep the load close, breathe out as you lift, and do not hold your breath. See the 'Lifting' page under MSK Pain & Posture for more."]
    ]);


// ==========================================
// MSK PAIN & POSTURE
// ==========================================

addTopic("backpain", "pain", "🔙", "Back Pain",
    "Back pain is very common in pregnancy and after birth because of hormonal changes, a growing bump and the demands of lifting and feeding a baby.",
    [
        ["Common causes",
            ["Increased curve in the lower back as the bump grows",
             "Softer ligaments due to pregnancy hormones",
             "Weak or tired back and abdominal muscles",
             "Long periods of poor posture, such as feeding positions"]],
        ["What can help",
            ["Keep moving. Gentle walking and swimming usually help more than complete rest.",
             "Change positions often.",
             "Use a warm pack or warm shower for muscle tension.",
             "Try a pregnancy support belt if recommended by a physiotherapist.",
             "Use a pillow behind your lower back when sitting."]],
        ["Gentle exercises",
            ["Pelvic tilts: on hands and knees, gently round and flatten your back.",
             "Cat and camel stretch.",
             "Child's pose with knees wide to make space for the bump.",
             "Deep abdominal breathing with gentle tummy engagement."]],
        ["Helpful daily habits",
            "Sleep on your side with a pillow between your knees, sit with support and avoid lifting heavy loads. See the Body Positioning pages for more detail."]
    ],
    "Seek urgent medical help if back pain comes with numbness around the genitals or buttocks, loss of bladder or bowel control, weakness in both legs, fever, or if you are pregnant and the pain is rhythmic, severe or associated with bleeding.");


addTopic("neckpain", "pain", "🙆‍♀️", "Neck & Shoulder Pain",
    "Feeding, carrying and looking down at a baby for long periods can strain the neck, shoulders and upper back.",
    [
        ["Why it happens",
            ["Rounded shoulders and a forward head while breastfeeding or bottle feeding",
             "Heavy breasts and weak upper back muscles",
             "Carrying a baby and baby equipment",
             "Stress and poor sleep, which increase muscle tension"]],
        ["Simple relief",
            ["Bring the baby up to you with pillows, do not lean down to the baby.",
             "Keep your head over your shoulders and your shoulders relaxed.",
             "Use a warm pack on tight muscles for 10 to 15 minutes.",
             "Take short movement breaks every 30 minutes."]],
        ["Gentle exercises",
            ["Slow neck turns from side to side.",
             "Ear toward shoulder stretch, held for 20 to 30 seconds.",
             "Shoulder rolls backward.",
             "Squeeze the shoulder blades together and hold for 5 seconds.",
             "Chin tucks: gently draw your chin back, as if making a double chin."]]
    ],
    "Seek medical advice for severe pain after an injury, pain that spreads down the arm with weakness, persistent numbness, severe headaches, or fever with a stiff neck.");


addTopic("numbness", "pain", "🖐️", "Pins & Needles, Numbness and Wrist Pain",
    "Tingling or numbness in the hands is common, especially in later pregnancy and in the early months of caring for a baby. It is often caused by fluid retention pressing on nerves, such as carpal tunnel syndrome.",
    [
        ["Typical signs",
            ["Tingling, burning or numbness in the thumb, index and middle fingers",
             "Symptoms worse at night or first thing in the morning",
             "Weak grip or dropping things",
             "Wrist pain from lifting and holding the baby (de Quervain's tenosynovitis)"]],
        ["What can help",
            ["Wear a night wrist splint that keeps the wrist straight.",
             "Avoid sleeping with wrists bent.",
             "Shake or gently stretch the hands when symptoms start.",
             "Rest the arms on pillows and keep them raised.",
             "Keep the wrist in line with the forearm when lifting the baby, use both hands and avoid gripping with the thumb alone."]],
        ["Other places for numbness",
            ["Numbness on the outer thigh can be due to a trapped nerve (meralgia paraesthetica). Avoid tight clothing and vary positions.",
             "Pins and needles in the feet or legs can come from the back, see Leg Pain & Sciatica."]]
    ],
    "Seek advice if numbness is constant, getting worse, affects both legs, or comes with weakness, loss of bladder or bowel control, sudden severe headache or visual changes. Tingling with swelling of the face and hands in pregnancy needs a blood pressure check promptly.");


addTopic("legpain", "pain", "🦵", "Leg Pain, Sciatica & Cramps",
    "Leg symptoms can come from nerves in the back, pelvic joints, muscles or circulation.",
    [
        ["Sciatica",
            ["Pain, tingling or numbness from the buttock down the back of the leg.",
             "Often worse with sitting or bending forward.",
             "Try changing position, gentle walking, heat and gentle stretches.",
             "Lie on the pain-free side with a pillow between your knees."]],
        ["Leg cramps",
            ["Common at night in later pregnancy.",
             "Stretch the calf by straightening the knee and pulling the toes toward you.",
             "Gentle calf stretches before bed, regular movement and drinking enough water may help."]],
        ["Swelling and heaviness",
            ["Rest with feet raised when you can.",
             "Avoid standing still for long periods.",
             "Walking and ankle circles improve circulation."]],
        ["Varicose veins",
            "Support tights, regular movement and raising the legs can ease aching. Avoid crossing legs for long periods."]
    ],
    "A hot, red, tender, swollen calf (usually one leg) can be a blood clot. Seek emergency help immediately, especially if you also have breathlessness or chest pain.");


addTopic("pgp", "pain", "🦴", "Pelvic Girdle Pain & Sacroiliac Joint Pain",
    "Pelvic girdle pain (PGP) includes pain around the pubic bone, sacroiliac (SI) joints at the back of the pelvis, hips and groin. It is common in pregnancy and can continue after birth. It is treatable, so ask for help early.",
    [
        ["Typical symptoms",
            ["Pain at the front or back of the pelvis, into the buttock, groin or thigh",
             "Pain turning in bed, climbing stairs, walking or standing on one leg",
             "A clicking or grinding sensation",
             "Pain getting in and out of the car or bath"]],
        ["Everyday tips",
            ["Keep your knees together when turning in bed or getting out of the car.",
             "Take smaller steps and avoid wide leg movements.",
             "Avoid standing on one leg. Sit to dress.",
             "Climb stairs one at a time, leading with the stronger leg going up.",
             "Avoid carrying heavy loads on one side.",
             "Avoid breaststroke kick in swimming."]],
        ["In bed",
            "Sleep on your side with a pillow between the knees and ankles. Use a satin sheet or pillowcase to help you turn smoothly. Keep knees together as you roll."],
        ["What treatment can help",
            ["Review by a women's health physiotherapist.",
             "A pelvic support belt, correctly fitted.",
             "Gentle strengthening for the deep abdominals, pelvic floor and hips.",
             "Pacing your activities and resting between tasks.",
             "Crutches temporarily if walking is very painful."]]
    ],
    "Contact your midwife, doctor or physiotherapist if pain is severe, limits walking, or does not improve after birth.");


addTopic("sitting", "pain", "🪑", "Sitting Positions",
    "Good sitting positions protect the back and pelvis, especially during feeding and desk work.",
    [
        ["At a chair or desk",
            ["Sit well back in the chair so your lower back is supported.",
             "Place a small rolled towel or cushion behind your lower back.",
             "Keep your feet flat on the floor, or on a footstool.",
             "Knees level with or slightly below the hips.",
             "Take a break to stand and walk about every 30 minutes."]],
        ["Feeding a baby",
            ["Choose a chair with arms and a firm back.",
             "Use pillows to raise the baby to breast or bottle height.",
             "Support your back, arms and feet.",
             "Switch sides and positions to avoid strain."]],
        ["Getting up from a chair",
            "Move to the front of the seat, place your feet apart, lean forward and push up through your legs. Breathe out as you stand."],
        ["After a caesarean or perineal tear",
            "Sit tall with a small cushion or support if sitting is uncomfortable. Lie down for part of the day to rest the area."]
    ]);


addTopic("lying", "pain", "🛏️", "Lying, Sleeping & Getting Out of Bed",
    "A good sleeping position reduces pain and helps you rest, which supports healing.",
    [
        ["Best position in pregnancy",
            "Lie on your side, either side is fine, with a pillow between the knees and another supporting the bump. In later pregnancy, going to sleep on your side is recommended."],
        ["Pregnancy pillows",
            "A long body pillow or wedge can support your back, bump and legs."],
        ["Rolling over in bed",
            "Bend your knees, keep them together, tighten your tummy and roll as one unit, rather than twisting."],
        ["Getting out of bed",
            ["Roll onto your side with knees bent.",
             "Let your legs drop over the edge of the bed while pushing up with your arms.",
             "Sit for a moment, then stand."],],
        ["Getting into bed",
            "Sit on the edge of the bed, lower down onto your side with support from your arms, then bring your legs up together."],
        ["After birth",
            "If you had stitches or a caesarean, support the wound with a pillow when you move. Rest lying down during the day."]
    ]);


addTopic("standing", "pain", "🧍", "Standing & Walking",
    "Standing for long periods can strain the back, pelvis and legs, especially in pregnancy.",
    [
        ["Standing well",
            ["Distribute weight evenly through both feet.",
             "Keep knees soft and not locked.",
             "Stand tall and gently draw the lower tummy in.",
             "Place one foot on a small step if standing for a long time and swap sides."]],
        ["Walking",
            ["Take comfortable steps, not too wide.",
             "Wear supportive, flat or low-heeled shoes.",
             "Rest when needed and build up distance gradually."]],
        ["Tasks at a counter",
            "Raise or lower the work surface if possible, keep items close, and take breaks to sit."]
    ]);


addTopic("lifting", "pain", "🏋️‍♀️", "Lifting & Carrying",
    "Safe lifting reduces strain on the back and pelvic floor. This is important in pregnancy and when caring for a toddler or baby.",
    [
        ["Before you lift",
            ["Ask yourself if you need to lift it at all.",
             "Test the weight first and ask for help if it is too heavy.",
             "Clear your path."]],
        ["How to lift",
            ["Stand close to the load with feet apart.",
             "Bend at your knees and hips, keep your back in its natural curve.",
             "Hold the load close to your body.",
             "Breathe out and gently tighten your pelvic floor as you lift.",
             "Straighten your legs to stand, using your leg muscles."]],
        ["Lifting a baby or toddler",
            ["Bring them close to your chest before lifting.",
             "Use a wide stable stance.",
             "Avoid twisting while carrying.",
             "Lower toddlers into the cot by bending your knees, not your back."]],
        ["Car seats and prams",
            ["Use a lighter carrier or pram if possible.",
             "Carry the seat close to the body, not at arm's length.",
             "Position the car seat in the car by turning your body, not twisting."]],
        ["Avoid",
            "Heavy lifting in late pregnancy, and in the first 6 weeks after birth or caesarean, unless advised."]
    ]);


addTopic("treatment", "pain", "🩹", "General Treatment for Aches & Pains",
    "Many muscle and joint problems improve with simple self-care. Early advice from a physiotherapist makes a big difference.",
    [
        ["Stay gently active",
            "Movement is usually good for pain. Short walks, gentle stretching and regular position changes are better than prolonged rest."],
        ["Heat and cold",
            ["Warmth can ease tight muscles. Use a warm pack for 10 to 15 minutes with a cloth between your skin and the heat.",
             "A cold pack can help for new, sore or swollen areas.",
             "Avoid hot water bottles directly on your bump."]],
        ["Pacing",
            "Break tasks into smaller chunks, alternate heavier and lighter tasks, and rest before pain becomes severe."],
        ["Supports",
            "Pregnancy support belts, supportive footwear and wrist splints can help some women. Ask a physiotherapist which is right for you."],
        ["Pain relief",
            "Always check with a pharmacist, midwife or doctor before taking any medicine in pregnancy or while breastfeeding."],
        ["When to get help",
            ["Pain that is getting worse or stopping you doing daily tasks",
             "Pain that wakes you at night",
             "Numbness, weakness or loss of bladder or bowel control"]]
    ],
    "Seek urgent medical help for chest pain, shortness of breath, severe headache, heavy bleeding, fever, or a hot, red, swollen leg.");


// ==========================================
// EMOTIONAL & SOCIAL WELL-BEING
// ==========================================

addTopic("mental", "emotional", "💜", "Emotional Changes & Mental Health",
    "Pregnancy and the months after birth bring huge physical and emotional change. Feeling a mix of joy, worry, tiredness and tearfulness is common, and so is needing support.",
    [
        ["Normal feelings",
            ["Mood swings and tearfulness",
             "Worry about the baby, birth or being a parent",
             "Feeling overwhelmed, especially when tired",
             "Excitement mixed with sadness or fear"]],
        ["Baby blues",
            "Many mothers feel low, anxious or tearful between days 3 and 10 after birth. It usually passes within two weeks. Rest, food, company and reassurance help."],
        ["Postnatal depression and anxiety",
            ["Low mood most of the day, nearly every day",
             "Loss of interest or pleasure",
             "Constant worry, panic, or intrusive thoughts",
             "Difficulty bonding, sleeping or eating",
             "Feeling like a failure or that the baby would be better off without you"]],
        ["What helps",
            ["Talk to someone you trust.",
             "Tell your midwife, health visitor or doctor. Treatment works and you will not be judged.",
             "Rest, eat regularly and go outside daily.",
             "Accept practical help with meals, cleaning and baby care.",
             "Gentle exercise and talking therapies can help."]]
    ],
    "If you have thoughts of harming yourself or your baby, or feel out of touch with reality, contact emergency services or your doctor immediately. You are not alone, and help is available.");


addTopic("personal", "emotional", "🌸", "Women's Personal Issues",
    "Many women experience personal and intimate concerns during and after pregnancy. These are normal, and you do not need to cope in silence.",
    [
        ["Body image",
            ["Your body changes in many ways. Stretch marks, weight and scars are signs of what your body has done.",
             "Avoid comparing yourself to others or social media images.",
             "Focus on strength, health and recovery, not shape."]],
        ["Intimacy and sex",
            ["Libido often changes. Tiredness, hormones, soreness and feeding can all play a part.",
             "Wait until you feel physically and emotionally ready, usually after bleeding has settled.",
             "Use lubricant if you feel dry, especially when breastfeeding.",
             "Talk openly with your partner about what feels comfortable.",
             "Pain is not normal. Seek advice if it persists."]],
        ["Contraception",
            "You can become pregnant again before your periods return. Discuss options with your doctor or midwife, including those compatible with breastfeeding."],
        ["Bladder and bowel concerns",
            "Leaking, urgency or constipation are common but treatable. Pelvic floor exercises and a physiotherapy review help."],
        ["Identity and self-care",
            "Becoming a mother does not mean losing yourself. Make time, even 15 minutes, for something that is just for you."],
        ["Hair, skin and tiredness",
            "Postpartum hair shedding, dry skin and exhaustion are common and usually temporary."]
    ]);


addTopic("father", "emotional", "👨", "For Fathers & Partners",
    "Fathers and partners play an important role. They can also feel stressed, left out or anxious. Both roles matter.",
    [
        ["Guidance for the father or partner",
            ["Attend appointments and antenatal classes if you can.",
             "Learn about labour, feeding and newborn care so you can help confidently.",
             "Take on household tasks such as cooking, laundry and shopping without being asked.",
             "Handle night-time changing and settling to let mum rest.",
             "Listen without trying to fix everything. Often she needs to be heard.",
             "Watch for signs of low mood and gently encourage her to seek help.",
             "Be patient with changes in sleep, mood and intimacy."]],
        ["Taking care of yourself",
            ["Dads and partners can experience anxiety and depression too.",
             "Keep up with sleep, food and exercise.",
             "Talk to friends or family, or ask your doctor for support."]],
        ["Bonding with the baby",
            ["Skin-to-skin contact, bathing, changing, rocking and talking to your baby build a strong bond.",
             "You do not need to wait for the baby to be older to start."]],
        ["Working together",
            "Make decisions about sleep, visitors and routines as a team. Short, kind, honest conversations every day prevent bigger conflicts."]
    ]);


addTopic("mother", "emotional", "👩", "Guidance for Mothers",
    "These are practical tips for mothers to protect their own well-being while caring for a baby.",
    [
        ["Ask for help",
            "Say clearly what you need, for example 'Can you take the baby for an hour so I can sleep?' People often want to help but do not know how."],
        ["Rest when you can",
            "Sleep when the baby sleeps, and accept that housework can wait."],
        ["Share the load",
            ["Share night feeds where possible. If bottle feeding or expressing, partners can take a shift.",
             "Divide chores fairly.",
             "Let go of perfection."]],
        ["Include your partner",
            "Let your partner care for the baby in their own way. Avoid taking over, as this helps them gain confidence."],
        ["Protect your mood",
            ["Eat regular meals and drink water.",
             "Go outside for fresh air and a short daily walk.",
             "Stay in touch with friends and other mothers.",
             "Limit visitors if you feel tired or overwhelmed."]],
        ["Know that you are doing well",
            "There is no perfect way to be a mother. Loving your baby and asking for help when you need it is already good parenting."]
    ]);


addTopic("family", "emotional", "👨‍👩‍👧", "Family & Relationship Issues",
    "A new baby changes family life. Understanding and communication help everyone adjust.",
    [
        ["Communicating well",
            ["Choose a calm time to talk, not when you are exhausted.",
             "Use 'I' statements, such as 'I feel tired and need help with...'.",
             "Listen without interrupting.",
             "Agree small, realistic changes."]],
        ["In-laws and extended family",
            ["Be clear and kind about boundaries, such as visiting times.",
             "Accept helpful advice and politely set aside what does not suit you.",
             "Discuss parenting decisions as a couple first, then share them together."]],
        ["Older children",
            ["Involve them in simple tasks, such as fetching nappies.",
             "Spend a few minutes of one-to-one time with each child every day.",
             "Expect some regression or clingy behaviour. It usually settles."]],
        ["Money and work worries",
            "Talk openly about finances and returning to work. Seek advice from employer or support services if needed."],
        ["Relationship strain",
            "Arguments are common during the sleep-deprived early months. If conflict becomes frequent, frightening or controlling, ask for help."]
    ],
    "If you feel unsafe, controlled, or afraid of your partner or a family member, tell your midwife, doctor or a domestic abuse helpline. Help is confidential.");


addTopic("stress", "emotional", "🌿", "Stress, Anxiety & Relaxation",
    "Stress is a normal response, but ongoing stress affects sleep, mood and health. Simple relaxation skills help.",
    [
        ["Slow breathing",
            ["Breathe in through your nose for 4 seconds.",
             "Breathe out slowly through your mouth for 6 seconds.",
             "Repeat for 5 minutes. Let your shoulders and belly soften."]],
        ["Muscle relaxation",
            "Tense and release each muscle group in turn, from your feet up to your face."],
        ["Grounding",
            "Name five things you can see, four you can touch, three you can hear, two you can smell, one you can taste."],
        ["Daily habits",
            ["Gentle exercise or a walk outdoors",
             "Regular meals",
             "Limiting caffeine",
             "Writing down worries",
             "Short breaks away from screens"]],
        ["Talk about it",
            "Sharing worries with a friend, midwife or support group lightens the load."]
    ]);


addTopic("sleep", "emotional", "😴", "Sleep & Tiredness",
    "Broken sleep is one of the hardest parts of early parenting. These tips can help you cope.",
    [
        ["Protect your rest",
            ["Sleep when the baby sleeps, even for short naps.",
             "Go to bed earlier than normal.",
             "Ask someone else to take a feed or the baby for a couple of hours."]],
        ["Improve sleep quality",
            ["Keep the bedroom dark and cool.",
             "Avoid screens before bed.",
             "Limit caffeine in the afternoon."]],
        ["During pregnancy",
            "Use pillows to support your bump and knees, lie on your side, and have a light evening meal to ease heartburn."],
        ["Safe sleep for baby",
            "Always place your baby on their back to sleep. See the Safe Sleep page under Baby Care."]
    ],
    "Extreme exhaustion, inability to sleep even when you can, or feeling hopeless are signs to talk to your doctor or health visitor.");


addTopic("support", "emotional", "🤝", "Social Support & Where to Get Help",
    "Strong support makes parenting easier. You do not have to do it alone.",
    [
        ["Who can help",
            ["Your partner, family and trusted friends",
             "Your midwife, health visitor and doctor",
             "Local parent and baby groups",
             "Breastfeeding and peer support groups",
             "Women's health physiotherapists",
             "Counsellors and talking therapy services"]],
        ["Make connections",
            ["Join an antenatal or postnatal class.",
             "Meet other mothers through local groups or online communities.",
             "Share honestly. Others often feel the same."]],
        ["Practical help",
            "Accept offers of meals, shopping and childcare. Make a list of things people can do."],
        ["Emergency numbers",
            "Keep your local emergency number, your midwife or maternity unit number, and your doctor's number somewhere visible."]
    ]);


// ==========================================
// NUTRITION
// ==========================================

addTopic("nutbefore", "nutrition", "🌱", "Eating Before Pregnancy",
    "Healthy eating before pregnancy prepares your body and supports early development of your baby.",
    [
        ["Build a balanced plate",
            ["Half the plate: vegetables and fruit",
             "A quarter: whole grains such as brown rice, oats, whole wheat bread",
             "A quarter: protein such as beans, lentils, eggs, fish, chicken or lean meat",
             "Add healthy fats such as nuts, seeds and olive oil"]],
        ["Key nutrients",
            ["Folic acid is taken as a supplement before and in early pregnancy. Ask your healthcare professional about the amount.",
             "Iron from leafy greens, lentils and meat.",
             "Calcium from dairy or fortified alternatives.",
             "Vitamin D, as advised locally."]],
        ["Limit",
            ["Sugary drinks and snacks",
             "Heavily processed foods",
             "Alcohol, which is best avoided",
             "Excess caffeine"]],
        ["Healthy weight",
            "Aim for steady, healthy weight. Avoid crash diets."]
    ]);


addTopic("nutduring", "nutrition", "🤰", "Eating During Pregnancy",
    "You do not need to 'eat for two'. You need better quality food, and only a small amount of extra energy in the later months.",
    [
        ["Key nutrients",
            ["Folic acid for the first 12 weeks, as advised.",
             "Iron for healthy blood: lentils, spinach, meat, fortified cereals. Vitamin C helps absorption.",
             "Calcium: milk, yoghurt, cheese, fortified foods.",
             "Iodine: fish, dairy.",
             "Omega-3 from oily fish, 1 to 2 portions a week.",
             "Fibre and fluids to prevent constipation."]],
        ["Foods to avoid or take care with",
            ["Raw or undercooked meat, eggs and fish",
             "Unpasteurised milk and soft mould-ripened cheeses",
             "Liver and liver products (too much vitamin A)",
             "High-mercury fish such as shark, swordfish and marlin",
             "Limit tuna and caffeine",
             "No alcohol"]],
        ["Nausea and vomiting",
            ["Eat small, frequent meals.",
             "Keep dry crackers by the bed and eat before getting up.",
             "Try ginger and cold foods.",
             "Sip fluids throughout the day."]],
        ["Heartburn",
            "Eat smaller meals, avoid spicy and fatty foods, avoid eating just before bed, and raise your head and shoulders when lying."],
        ["Food safety",
            "Wash hands, fruit and vegetables, and store and reheat food properly."]
    ],
    "Seek advice if you cannot keep any food or fluid down, lose weight, or have dark urine and dizziness. These may be signs of severe pregnancy sickness.");


addTopic("nutafter", "nutrition", "🍼", "Eating After Birth & While Breastfeeding",
    "Good nutrition helps you heal, keeps your energy up, and supports breastfeeding.",
    [
        ["Energy and meals",
            ["Eat regular meals and healthy snacks.",
             "Keep easy snacks nearby, such as nuts, fruit, yoghurt and sandwiches.",
             "Breastfeeding uses extra energy, so listen to your hunger."]],
        ["Fluids",
            "Drink when you are thirsty and keep a glass of water where you feed."],
        ["Important nutrients",
            ["Protein for healing",
             "Iron to rebuild after blood loss",
             "Calcium and vitamin D",
             "Omega-3 from oily fish",
             "Fibre to prevent constipation"]],
        ["Caffeine and alcohol",
            "Limit caffeine. Avoid alcohol while breastfeeding, or ask your healthcare professional for advice about timing."],
        ["Weight",
            "Healthy weight loss should be gradual. Avoid strict diets in the first months, especially while breastfeeding."]
    ]);


addTopic("iron", "nutrition", "🩸", "Iron, Anaemia & Supplements",
    "Iron is needed to make blood. Needs rise in pregnancy and after heavy blood loss.",
    [
        ["Signs of low iron",
            ["Constant tiredness",
             "Pale skin",
             "Breathlessness",
             "Dizziness or headaches",
             "Fast heartbeat"]],
        ["Iron-rich foods",
            ["Red meat, chicken, fish",
             "Lentils, beans, chickpeas",
             "Dark green leafy vegetables",
             "Fortified breakfast cereals",
             "Dried apricots, nuts and seeds"]],
        ["Improve absorption",
            ["Eat vitamin C foods (oranges, peppers, tomatoes) with iron foods.",
             "Avoid tea and coffee with meals, as they reduce absorption."]],
        ["Supplements",
            "Take iron or vitamin supplements only as advised by a healthcare professional. Iron can cause constipation, so eat fibre and drink water."]
    ]);


addTopic("hydration", "nutrition", "💧", "Hydration & Constipation",
    "Staying hydrated supports energy, digestion and breast milk supply.",
    [
        ["How much?",
            "Drink regularly through the day. Pale yellow urine is a good sign you are drinking enough."],
        ["Ideas",
            ["Keep a water bottle with you.",
             "Add slices of fruit for flavour.",
             "Include soups, fruit and vegetables."]],
        ["Constipation tips",
            ["Fibre: whole grains, fruit, vegetables, pulses",
             "Drink plenty of fluids",
             "Gentle walking",
             "Do not strain. Use a footstool and lean forward on the toilet.",
             "Ask your pharmacist for a safe laxative if needed."]]
    ]);


addTopic("breastdiet", "nutrition", "🤱", "Diet Tips for Breastfeeding Mothers",
    "Breast milk quality is protected even when your diet is not perfect, but good food will help you feel well.",
    [
        ["Everyday foods",
            ["A variety of fruit and vegetables",
             "Whole grains",
             "Protein with every meal",
             "Healthy fats"]],
        ["Things to be aware of",
            ["Caffeine passes into milk. Keep it moderate.",
             "Avoid alcohol or plan carefully.",
             "Limit high-mercury fish.",
             "Note whether your baby reacts to a food. Most babies are not bothered by mum's diet."]],
        ["Common myths",
            ["You do not need to avoid spicy food unless your baby clearly reacts.",
             "You do not need to drink milk to make milk."]]
    ]);


// ==========================================
// BABY CARE
// ==========================================

addTopic("nappy", "baby", "🧷", "Nappy Changing & Nappy Rash",
    "Newborns may need up to 8 to 12 nappy changes a day. Regular changing keeps skin healthy and comfortable.",
    [
        ["Get ready",
            ["Wash your hands.",
             "Lay everything within reach: clean nappy, wipes or cotton wool and warm water, barrier cream if needed.",
             "Use a changing mat on a safe surface and never leave your baby alone on a raised surface."]],
        ["Step by step",
            ["Lay baby on their back and open the dirty nappy.",
             "Lift the legs gently by the ankles and wipe from front to back.",
             "Clean the skin folds and dry gently.",
             "Slide the clean nappy under and fasten it so you can fit two fingers inside.",
             "For boys, keep a cloth ready over the area and point the penis down.",
             "Dispose of the nappy and wash your hands."]],
        ["Cord care",
            "Fold the nappy below the umbilical cord stump to keep it dry and exposed to air."],
        ["Nappy rash",
            ["Change often and let the skin air-dry between changes.",
             "Use a barrier cream.",
             "Avoid scented wipes and soaps.",
             "Use water and cotton wool for very sore skin."]],
        ["Protect your back",
            "Raise the changing surface to elbow height so you do not have to bend over."]
    ],
    "See a doctor or health visitor if the rash is blistered, bleeding, spreading, or not improving in a few days, or if your baby has fewer wet nappies than usual, blood in stool, or white or very pale stools.");


addTopic("holding", "baby", "🤲", "Holding, Carrying & Positioning Your Baby",
    "Newborns need head and neck support. Comfortable holds protect both you and your baby.",
    [
        ["Supporting the head",
            "Always support your baby's head and neck when lifting or holding, until they have good control, around 3 to 4 months."],
        ["Common holds",
            ["Cradle hold: head in the crook of your arm, supported along the back.",
             "Shoulder hold: baby upright against your shoulder, one hand supporting the head and the other the bottom.",
             "Football hold: baby tucked along your side under your arm, useful after a caesarean.",
             "Face-down hold along your forearm can soothe wind or colic."]],
        ["Lifting from a cot or bed",
            "Slide one hand under the head and neck and the other under the bottom. Bring baby close to your body before lifting."],
        ["Baby carriers and slings",
            ["Choose a carrier that supports baby in a natural position, with knees higher than the bottom.",
             "Keep baby's face visible and the airway clear.",
             "Keep baby close and upright, chin off the chest."]],
        ["Positioning for development",
            "Vary positions through the day. Avoid long periods in car seats, bouncers and swings."]
    ]);


addTopic("breastfeeding", "baby", "🤱", "Breastfeeding",
    "Breastfeeding is natural, but it is a skill that takes time. Support makes a big difference.",
    [
        ["Getting started",
            ["Have skin-to-skin contact soon after birth.",
             "Feed early and often, at least 8 to 12 times in 24 hours in the early days.",
             "Feed on demand and watch for early feeding cues, such as stirring, mouth opening or turning the head."]],
        ["A good latch",
            ["Baby's mouth is wide open with more of the areola showing above the top lip than below.",
             "Chin touches the breast and the nose is free.",
             "You should feel pulling, not pinching or sharp pain.",
             "If it hurts, gently break the suction with your finger and re-latch."]],
        ["Positions",
            ["Cradle, cross-cradle, football (rugby) hold or lying on your side.",
             "Bring the baby to the breast, not the breast to the baby.",
             "Support your back and arms with pillows."]],
        ["Is baby getting enough?",
            ["Wet and dirty nappies increase in number over the first week.",
             "Baby swallows during feeds and seems content afterwards.",
             "Baby gains weight steadily after the first few days."]],
        ["Common problems",
            ["Sore nipples: usually due to latch. Ask for help.",
             "Engorgement: feed often, gentle massage, warm compress before and cold after.",
             "Blocked ducts: continue feeding, gently massage toward the nipple.",
             "Mastitis: a red, hot, painful breast with flu-like symptoms. Keep feeding and seek medical advice."]],
        ["Looking after yourself",
            "Eat and drink well, rest, and ask for help from your midwife, health visitor or a breastfeeding counsellor."]
    ],
    "Contact your doctor if you have a fever, a hard red painful area on the breast, or if your baby is very sleepy, has few wet nappies, or is losing weight.");


addTopic("bottle", "baby", "🍼", "Bottle Feeding & Expressing",
    "Whether you use formula or expressed milk, safe preparation and responsive feeding matter.",
    [
        ["Hygiene",
            ["Wash hands before preparing feeds.",
             "Clean and sterilise bottles, teats and equipment until baby is at least 12 months, or as advised locally.",
             "Make up each feed fresh and throw away leftovers."]],
        ["Making formula safely",
            ["Follow the tin instructions exactly, using the correct scoop and water amounts.",
             "Add the water first, then the powder.",
             "Cool the feed to body temperature and test on your wrist."]],
        ["Feeding position",
            ["Hold your baby semi-upright, supporting the head.",
             "Keep the bottle tilted so the teat stays full of milk.",
             "Pace the feed by pausing to let baby rest and burp.",
             "Never prop a bottle or leave baby alone with it."]],
        ["Expressing breast milk",
            "Wash hands, express by hand or pump, and store milk in clean containers. Follow local guidance on storage times in the fridge or freezer."],
        ["Signs baby has had enough",
            "Turning away, slowing down, closing the mouth or falling asleep. Let your baby decide how much to take."]
    ]);


addTopic("burping", "baby", "💨", "Burping, Wind & Colic",
    "Babies swallow air when feeding. Winding helps them feel comfortable.",
    [
        ["Burping positions",
            ["Over your shoulder, gently patting or rubbing the back.",
             "Sitting on your lap, supporting the chin and chest.",
             "Lying face down across your lap."]],
        ["When to burp",
            "Pause during the feed and again at the end. Do not worry if nothing comes up after a minute or two."],
        ["Colic",
            ["Colic means frequent, intense crying, often in the evenings, in an otherwise healthy baby.",
             "It usually starts in the first weeks and settles by 4 to 6 months.",
             "Try holding upright after feeds, gentle tummy massage, warm bath, carrying in a sling, or white noise."]],
        ["Looking after yourself",
            "Put baby safely in the cot and take a few minutes' break if you feel overwhelmed. Never shake a baby."]
    ],
    "See a doctor if baby cries with a fever, vomits green or bloody fluid, has a swollen tummy, refuses feeds, or seems very unwell.");


addTopic("safesleep", "baby", "🛌", "Safe Sleep",
    "Safe sleeping reduces the risk of sudden infant death (SIDS).",
    [
        ["The safest way",
            ["Always place your baby on their back to sleep, for every sleep.",
             "Use a firm, flat, waterproof mattress in a cot or Moses basket.",
             "Keep the cot in your room for the first 6 months."]],
        ["Keep the cot clear",
            ["No pillows, duvets, bumpers or soft toys.",
             "Feet to the foot of the cot, with a lightweight blanket tucked in only up to chest level, or use a baby sleeping bag.",
             "Do not cover the head."]],
        ["Temperature",
            "Keep the room comfortable, around 16 to 20 degrees C. Check that baby's chest is not too hot or sweaty."],
        ["Avoid",
            ["Smoking in the home or near the baby",
             "Sleeping with baby on a sofa or armchair",
             "Bed-sharing if you or your partner smoke, have drunk alcohol, or taken drugs or sedating medication, or if baby was premature or small"]],
        ["Feeding to sleep",
            "If you may fall asleep while feeding, make sure you are on a bed (not a sofa), with no pillows near baby, and return baby to their cot when you wake."]
    ]);


addTopic("bathing", "baby", "🛁", "Bathing & Skin Care",
    "Newborns do not need a bath every day. A few times a week, plus 'top and tail' washing, is enough.",
    [
        ["Get ready",
            ["Have everything ready: towel, clean nappy, clothes.",
             "Warm the room.",
             "Test the water with your elbow. It should feel warm, not hot.",
             "Never leave your baby alone in the bath, even for a moment."]],
        ["Bathing",
            ["Support the head and neck with one arm.",
             "Wash from the cleanest areas to the dirtiest.",
             "Rinse well and wrap baby in a towel.",
             "Dry skin folds carefully."]],
        ["Top and tail",
            "Use cotton wool and warm water to gently clean the face, neck, hands and nappy area."],
        ["Umbilical cord stump",
            "Keep it clean and dry. It usually falls off within 1 to 3 weeks. Avoid covering it with the nappy."],
        ["Skin care",
            ["Avoid perfumed products.",
             "Use fragrance-free moisturiser for dry skin.",
             "Cradle cap is common and harmless. Gentle washing usually helps."]]
    ],
    "Seek advice if the cord stump area becomes red, swollen, smelly or oozing, or if your baby develops a fever or a spreading rash.");


addTopic("tummytime", "baby", "🐣", "Tummy Time & Development",
    "Play helps baby build strength and learn about the world.",
    [
        ["Tummy time",
            ["Start from the first days, for a few minutes at a time, when baby is awake and supervised.",
             "Place baby on a firm surface on their tummy, or on your chest.",
             "Build up gradually as baby gets stronger.",
             "It strengthens the neck, shoulders and back and helps prevent flat head."]],
        ["Playing and bonding",
            ["Talk, sing and make eye contact.",
             "Show black-and-white or high-contrast pictures.",
             "Offer safe toys to grasp.",
             "Read together every day."]],
        ["Typical milestones",
            ["Around 6 to 8 weeks: first social smiles",
             "Around 3 to 4 months: holds head up, laughs",
             "Around 6 months: rolls and begins to sit with support",
             "Around 9 to 12 months: crawling, pulling up, first words"]],
        ["Remember",
            "Every baby develops at their own pace. Speak with your health visitor if you are worried."]
    ]);


addTopic("crying", "baby", "😢", "Crying & Soothing",
    "Crying is how babies communicate. Understanding it helps you respond calmly.",
    [
        ["Common reasons",
            ["Hunger",
             "Wet or dirty nappy",
             "Wind",
             "Too hot or too cold",
             "Tiredness or overstimulation",
             "Need for closeness"]],
        ["Ways to soothe",
            ["Hold your baby close, skin-to-skin",
             "Gentle rocking or walking",
             "White noise or soft humming",
             "Swaddling, if advised and done safely",
             "A warm bath or gentle massage",
             "Reduce light and noise"]],
        ["If you feel overwhelmed",
            "Place baby safely on their back in the cot and step into another room for a few minutes. Call someone for support. Never shake a baby."]
    ]);


addTopic("babywarning", "baby", "🚨", "Baby Danger Signs",
    "Newborns can become unwell quickly. Trust your instincts and seek help early.",
    [
        ["Seek urgent medical help if your baby",
            ["Is very sleepy and hard to wake, or floppy",
             "Has a high temperature (38 degrees C or above) in the first 3 months, or a very low temperature",
             "Is breathing fast, noisily, or with the chest pulling in",
             "Has blue, grey or very pale skin or lips",
             "Is not feeding or has very few wet nappies",
             "Has yellow skin or eyes in the first days, or yellowing that is worsening",
             "Vomits green or bloody fluid",
             "Has a bulging or sunken soft spot on the head",
             "Has a fit or seizure, or a rash that does not fade when pressed with a glass"]],
        ["Keep handy",
            "Save emergency and local health service numbers on your phone and keep your baby's health record nearby."]
    ]);


// ==========================================
// PREGNANCY, LABOUR & RECOVERY
// ==========================================

addTopic("changes", "pregnancy", "🌼", "Body Changes in Pregnancy",
    "Your body changes in many ways to support your growing baby. Knowing what is normal can ease worry.",
    [
        ["First trimester (weeks 1 to 12)",
            ["Tiredness, nausea and breast tenderness",
             "Frequent urination",
             "Mood changes",
             "Food aversions or cravings"]],
        ["Second trimester (weeks 13 to 27)",
            ["Energy often returns and sickness eases",
             "Bump grows and baby movements are felt",
             "Back pain, leg cramps, heartburn and nasal congestion may appear"]],
        ["Third trimester (weeks 28 to birth)",
            ["Shortness of breath and heartburn as the baby grows",
             "Swollen ankles and tiredness",
             "Practice (Braxton Hicks) tightenings",
             "Difficulty sleeping and pelvic pressure"]],
        ["Antenatal care",
            "Attend all antenatal appointments and screening. Tell your midwife about any concerns."]
    ],
    "Seek urgent help for vaginal bleeding, fluid leaking, severe or constant tummy pain, severe headache, visual changes, sudden face or hand swelling, reduced baby movements, or fever.");


addTopic("preparelabour", "pregnancy", "🎒", "Preparing for Labour",
    "Preparing helps you feel more confident and in control.",
    [
        ["Learn and plan",
            ["Attend antenatal classes.",
             "Write a birth plan, but stay flexible, as plans can change.",
             "Discuss preferences with your midwife.",
             "Choose your birth partner and make sure they know your wishes."]],
        ["Hospital bag",
            ["Maternity notes",
             "Comfortable clothes and nightwear",
             "Toiletries, maternity pads and underwear",
             "Snacks and drinks",
             "Baby clothes, nappies and a car seat for going home",
             "Phone and charger"]],
        ["Get your body ready",
            ["Keep active and practise pelvic floor and breathing exercises.",
             "Practise labour positions and relaxation.",
             "Perineal massage from about 35 weeks may help reduce tearing if you wish. Ask your midwife."]],
        ["Know the signs of labour",
            ["Regular tightenings that become longer, stronger and closer together",
             "A 'show' of mucus with blood",
             "Waters breaking",
             "Backache and period-like pains"]]
    ],
    "Contact your maternity unit if your waters break, you have bleeding, baby is moving less, or contractions are regular and strong.");


addTopic("stages", "pregnancy", "⏱️", "Stages of Labour",
    "Labour has three stages. Every labour is different in length and pattern.",
    [
        ["First stage",
            ["Early labour: cervix softens and opens up to about 4 cm. Contractions are mild and irregular. Stay at home if you can, rest, eat, drink and move around.",
             "Active labour: contractions are stronger and regular. The cervix opens from about 4 cm to fully open (10 cm). Go to hospital or call your midwife as advised."]],
        ["Second stage",
            "From full dilation to the birth of the baby. You will feel the urge to push. Your midwife guides you with breathing and pushing."],
        ["Third stage",
            "Delivery of the placenta, usually within an hour. You may be offered an injection to reduce bleeding."],
        ["First hours after birth",
            "Skin-to-skin contact with your baby, and early breastfeeding if you plan to, support bonding and feeding."]
    ]);


addTopic("labourcoping", "pregnancy", "🌬️", "Coping with Labour: Positions & Pain Relief",
    "Many options can help with the pain and discomfort of labour. You can use several, and change your mind.",
    [
        ["Active positions",
            ["Walking, swaying and rocking the hips",
             "Leaning forward over a bed, birth ball or partner",
             "On hands and knees",
             "Kneeling, squatting or using a birthing stool",
             "Side-lying with pillows"]],
        ["Self-help",
            ["Slow breathing, focusing on long out-breaths",
             "Relaxation and visualisation",
             "Warm water or shower",
             "Massage and counter-pressure on the lower back",
             "Heat packs",
             "TENS machine in early labour",
             "Music, dim lights and a calm environment"]],
        ["Medical options",
            ["Gas and air (Entonox)",
             "Injections of pain-relieving medication",
             "Epidural, which gives strong pain relief but may limit movement"]],
        ["Support",
            "Choose a birth partner who knows your wishes, and ask questions at any point. You are always allowed to ask for what you need."]
    ]);


addTopic("vaginalrecovery", "pregnancy", "🌷", "Recovery After a Vaginal Birth",
    "Your body needs time to heal after birth, especially if you had stitches or a tear.",
    [
        ["Bleeding (lochia)",
            "Vaginal bleeding after birth can last for 4 to 6 weeks. It starts red and heavy, then becomes lighter and paler. Use maternity pads, not tampons."],
        ["Perineal care",
            ["Keep the area clean and dry. Wash with warm water after using the toilet and pat dry.",
             "Change pads regularly.",
             "Use cold packs wrapped in cloth for the first days to ease swelling.",
             "Take recommended pain relief as advised.",
             "Pour warm water over the area while passing urine if stinging."]],
        ["Toilet tips",
            ["Eat fibre and drink plenty of water.",
             "Support the area with a clean pad when opening your bowels.",
             "Do not strain. Lean forward with feet on a stool."]],
        ["Resting and moving",
            "Short walks, lying down to rest and sitting on a cushion or ring if sore all help. Gentle pelvic floor exercises improve healing."],
        ["Afterpains",
            "Cramps as the womb shrinks are normal, especially while breastfeeding."],
        ["Check-ups",
            "Attend your postnatal checks with your midwife and doctor, usually at around 6 to 8 weeks."]
    ],
    "Contact your doctor or midwife if you have heavy bleeding (soaking a pad in an hour), large clots, foul-smelling discharge, fever, a wound that is more painful, red or leaking, or severe pain.");


addTopic("csection", "pregnancy", "🩺", "Recovery After a Caesarean Birth",
    "A caesarean is a major operation, and recovery takes time. Be kind to yourself and accept help.",
    [
        ["Wound care",
            ["Keep the wound clean and dry.",
             "Wash gently with warm water and pat dry.",
             "Wear loose, soft clothing and high-waisted underwear.",
             "Watch for redness, swelling, heat or discharge."]],
        ["Moving safely",
            ["Support your wound with a pillow when coughing, laughing or sneezing.",
             "Roll onto your side and push up with your arms to get out of bed.",
             "Walk short distances daily to reduce the risk of blood clots.",
             "Do not lift anything heavier than your baby for about 6 weeks, unless advised."]],
        ["Pain relief",
            "Take the regular pain relief recommended by your team. Good pain control helps you move and care for your baby."],
        ["Driving and activity",
            "Wait until you can do an emergency stop without pain. Check with your insurance and doctor."],
        ["Feeding positions",
            "The football hold or side-lying position keeps the baby away from the wound."],
        ["Emotional recovery",
            "Some mothers feel upset about their birth experience. Talk to your midwife or doctor if you need to discuss it."]
    ],
    "Seek help if you have a fever, a wound that is red, hot, leaking or opening, heavy bleeding, severe pain, a swollen painful leg, or breathlessness.");


addTopic("postpartum", "pregnancy", "🏡", "Postpartum Care: The First 6 Weeks",
    "The weeks after birth are called the postpartum or postnatal period. This is a time for rest, healing and bonding.",
    [
        ["Rest",
            "Accept help. Sleep when you can. Limit visitors if you are tired."],
        ["Healing",
            "Expect bleeding, afterpains and soreness. Stay clean, eat well, and move gently each day."],
        ["Breasts",
            "Your milk comes in around days 3 to 5. Feed often. Wear a supportive bra."],
        ["Emotional health",
            "Mood swings are common. Persistent low mood or anxiety is a reason to seek help."],
        ["Relationships and intimacy",
            "Wait until you feel ready. Use lubrication if dry, and talk about it."],
        ["Contraception",
            "Discuss contraception at your postnatal check. You can become pregnant before your periods return."],
        ["Six-week check",
            "This is a chance to discuss recovery, mood, contraception, pelvic floor, and any worries."]
    ],
    "Call your doctor or emergency services urgently for heavy bleeding, fever, severe headache or visual changes, chest pain or breathlessness, swollen painful calf, wound infection, or thoughts of harming yourself or your baby.");


addTopic("warningsigns", "pregnancy", "🚨", "Warning Signs: When to Get Help",
    "Knowing the warning signs allows you to get help quickly. If in doubt, always call.",
    [
        ["In pregnancy",
            ["Vaginal bleeding",
             "Waters breaking before labour",
             "Severe or constant tummy pain",
             "Severe headache, blurred vision, or flashing lights",
             "Sudden swelling of face, hands or feet",
             "Reduced or changed baby movements",
             "Fever or severe vomiting",
             "Painful, regular contractions before 37 weeks"]],
        ["After birth",
            ["Soaking a pad in an hour, or passing large clots",
             "Fever or chills",
             "Foul-smelling vaginal discharge",
             "Red, hot, painful wound or breast",
             "Painful swollen calf",
             "Breathlessness or chest pain",
             "Severe headache or visual disturbance",
             "Feeling very low, hopeless, or having thoughts of self-harm"]],
        ["What to do",
            "Contact your midwife, maternity unit or doctor, or call emergency services if it is an emergency."]
    ]);
