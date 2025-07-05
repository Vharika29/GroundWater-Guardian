const quizData = [
    {
        level: 1,
        title: "Groundwater Basics",
        questions: [
            {
                question: "What is groundwater?",
                options: [
                    "Water found in rivers",
                    "Water stored in oceans",
                    "Water found beneath the Earth's surface in aquifers",
                    "Water in the atmosphere"
                ],
                answer: "Water found beneath the Earth's surface in aquifers",
                info: "Groundwater is water that has seeped into the ground and is stored in geological formations called aquifers."
            },
            {
                question: "What is an aquifer?  ",
                options: [
                    "A type of cloud",
                    "An underground layer of permeable rock or unconsolidated materials (gravel, sand, silt) from which groundwater can be extracted",
                    "A deep ocean trench",
                    "A forest ecosystem"
                ],
                answer: "An underground layer of permeable rock or unconsolidated materials (gravel, sand, silt) from which groundwater can be extracted",
                info: "Aquifers are crucial for holding and transmitting groundwater, acting like natural underground reservoirs."
            },
            {
                question: "What percentage of the world's fresh water is groundwater?",
                options: [
                    "1%",
                    "10%",
                    "30%",
                    "60%"
                ],
                answer: "30%",
                info: "About 30% of the world's fresh water is groundwater, making it a significant resource for drinking and agriculture."
            },
            {
                question: "How does groundwater typically get replenished?",
                options: [
                    "Evaporation from lakes",
                    "Ocean waves",
                    "Precipitation (rain and snow) seeping into the ground",
                    "Melting glaciers directly"
                ],
                answer: "Precipitation (rain and snow) seeping into the ground",
                info: "Groundwater recharge primarily occurs when water from rain, snowmelt, or surface water bodies infiltrates the soil and moves downward to replenish aquifers."
            },
            {
                question: "Which term describes the process of water soaking into the ground?",
                options: [
                    "Runoff",
                    "Evapotranspiration",
                    "Infiltration",
                    "Condensation"
                ],
                answer: "Infiltration",
                info: "Infiltration is the process by which water on the ground surface enters the soil."
            },
            {
                question: "What is the upper surface of the zone of saturation called?",
                options: [
                    "Water table",
                    "Impermeable layer",
                    "Recharge zone",
                    "Capillary fringe"
                ],
                answer: "Water table",
                info: "The water table is the boundary between the unsaturated zone and the saturated zone where all pore spaces are filled with water."
            },
            {
                question: "Which rock type is generally a good aquifer material?",
                options: [
                    "Granite",
                    "Clay",
                    "Sandstone",
                    "Shale"
                ],
                answer: "Sandstone",
                info: "Sandstone is typically permeable, allowing water to flow through it easily, making it a good aquifer material. Clay and shale are generally impermeable."
            },
            {
                question: "What is a 'spring' in relation to groundwater?",
                options: [
                    "A type of pump",
                    "A natural outflow of groundwater from the ground",
                    "A man-made well",
                    "A small river"
                ],
                answer: "A natural outflow of groundwater from the ground",
                info: "Springs occur when the water table meets the land surface, causing groundwater to emerge naturally."
            },
            {
                question: "What is the main driving force for groundwater movement?",
                options: [
                    "Wind",
                    "Sunlight",
                    "Gravity",
                    "Tides"
                ],
                answer: "Gravity",
                info: "Gravity pulls water downwards through the soil and rock, causing groundwater to flow from higher to lower elevations."
            },
            {
                question: "What is the 'zone of saturation'?",
                options: [
                    "The area above the water table where pores are filled with air",
                    "The area where all rock and soil pore spaces are completely filled with water",
                    "The surface of a lake",
                    "The topsoil layer"
                ],
                answer: "The area where all rock and soil pore spaces are completely filled with water",
                info: "The zone of saturation is the part of the ground where all voids are filled with water."
            },
        ]
    },
    {
        level: 2,
        title: "Groundwater Depletion & Pollution",
        questions: [
            {
                question: "What is a major cause of groundwater depletion?",
                options: [
                    "Rainfall",
                    "Over-pumping for agriculture and industry",
                    "Cloud formation",
                    "Ocean currents"
                ],
                answer: "Over-pumping for agriculture and industry",
                info: "Excessive extraction of groundwater beyond its natural replenishment rate leads to depletion, often due to irrigation and industrial needs."
            },
            {
                question: "Which of these is a common pollutant of groundwater?",
                options: [
                    "Pure oxygen",
                    "Plastic waste in landfills",
                    "Sunlight",
                    "Nitrates from agricultural fertilizers"
                ],
                answer: "Nitrates from agricultural fertilizers",
                info: "Agricultural runoff containing fertilizers and pesticides can infiltrate the ground and contaminate groundwater."
            },
            {
                question: "What is a consequence of groundwater depletion?",
                options: [
                    "Increased rainfall",
                    "Land subsidence (sinking ground)",
                    "Stronger tides",
                    "Faster river flow"
                ],
                answer: "Land subsidence (sinking ground)",
                info: "When large amounts of groundwater are removed, the land above the aquifer can compact and sink, causing irreversible damage."
            },
            {
                question: "What is 'saltwater intrusion'?",
                options: [
                    "Freshwater mixing with river water",
                    "The movement of saline water into freshwater aquifers, usually due to excessive groundwater pumping in coastal areas",
                    "Salt dissolved in ocean water",
                    "Rainwater becoming salty"
                ],
                answer: "The movement of saline water into freshwater aquifers, usually due to excessive groundwater pumping in coastal areas",
                info: "Saltwater intrusion is a major problem in coastal regions, making freshwater wells unusable."
            },
            {
                question: "Which industrial activity is a significant source of groundwater pollution?",
                options: [
                    "Wind power generation",
                    "Improper disposal of chemical waste",
                    "Solar panel manufacturing",
                    "Paper recycling"
                ],
                answer: "Improper disposal of chemical waste",
                info: "Toxic chemicals from industrial waste can leach into the ground and contaminate groundwater if not disposed of correctly."
            },
            {
                question: "What common household item can contribute to groundwater pollution if disposed of improperly?",
                options: [
                    "Used batteries",
                    "Cardboard boxes",
                    "Glass bottles",
                    "Newspapers"
                ],
                answer: "Used batteries",
                info: "Batteries contain heavy metals like lead and cadmium, which can leach into groundwater if disposed of in regular landfills."
            },
            {
                question: "How does leaky septic systems pollute groundwater?",
                options: [
                    "By adding beneficial nutrients",
                    "By releasing untreated wastewater containing pathogens and chemicals",
                    "By increasing oxygen levels",
                    "By causing land uplift"
                ],
                answer: "By releasing untreated wastewater containing pathogens and chemicals",
                info: "Faulty septic systems can contaminate groundwater with bacteria, viruses, and nitrates from human waste."
            },
            {
                question: "What is the term for a situation where a groundwater well runs dry due to over-pumping?",
                options: [
                    "Waterlogging",
                    "Well failure",
                    "Groundwater rebound",
                    "Water saturation"
                ],
                answer: "Well failure",
                info: "Well failure occurs when the water table drops below the depth of the well, making it unable to draw water."
            },
            {
                question: "Which of these is a 'non-point source' of groundwater pollution?",
                options: [
                    "A specific factory discharge pipe",
                    "A leaking underground storage tank",
                    "Agricultural runoff over a large area",
                    "A municipal sewage treatment plant"
                ],
                answer: "Agricultural runoff over a large area",
                info: "Non-point source pollution comes from diffuse sources over a large area, making it harder to identify and control, unlike point sources."
            },
            {
                question: "What is the primary effect of excessive pumping on the water table?",
                options: [
                    "It rises",
                    "It remains stable",
                    "It drops",
                    "It turns saline"
                ],
                answer: "It drops",
                info: "Over-pumping causes the water table to decline, as water is removed faster than natural recharge can replenish it."
            },
        ]
    },
    {
        level: 3,
        title: "Groundwater Conservation",
        questions: [
            {
                question: "What is 'rainwater harvesting'?",
                options: [
                    "Collecting rainwater from rivers",
                    "Collecting and storing rainwater for future use",
                    "Draining rainwater into the ocean",
                    "Evaporating rainwater"
                ],
                answer: "Collecting and storing rainwater for future use",
                info: "Rainwater harvesting is an effective method to augment groundwater levels by recharging aquifers or directly using collected water."
            },
            {
                question: "Which farming practice helps conserve groundwater?",
                options: [
                    "Flood irrigation",
                    "Drip irrigation",
                    "Using more chemical fertilizers",
                    "Planting water-intensive crops"
                ],
                answer: "Drip irrigation",
                info: "Drip irrigation delivers water directly to plant roots, minimizing evaporation and runoff, and significantly reducing water usage compared to flood irrigation."
            },
            {
                question: "Why is it important to conserve groundwater?",
                options: [
                    "To make more space underground",
                    "It's a finite and vital resource for drinking, agriculture, and ecosystems",
                    "It cools the Earth's core",
                    "It helps clouds form faster"
                ],
                answer: "It's a finite and vital resource for drinking, agriculture, and ecosystems",
                info: "Groundwater is essential for human survival and supports many natural habitats. Conserving it ensures its availability for future generations."
            },
            {
                question: "What is a 'pervious surface' and how does it help groundwater conservation?",
                options: [
                    "A waterproof surface that prevents water absorption",
                    "A surface that allows water to infiltrate into the ground, promoting recharge",
                    "A shiny surface that reflects sunlight",
                    "A surface that causes water to evaporate faster"
                ],
                answer: "A surface that allows water to infiltrate into the ground, promoting recharge",
                info: "Pervious (or permeable) surfaces like gravel, pavers with gaps, or green spaces allow rainwater to soak into the ground instead of running off."
            },
            {
                question: "How can individuals conserve groundwater at home?",
                options: [
                    "Taking longer showers",
                    "Leaving faucets running",
                    "Fixing leaky pipes and toilets",
                    "Watering lawns frequently"
                ],
                answer: "Fixing leaky pipes and toilets",
                info: "Even small leaks can waste significant amounts of water over time, contributing to overall water consumption."
            },
            {
                question: "What is the purpose of 'managed aquifer recharge' (MAR)?",
                options: [
                    "To remove water from aquifers",
                    "To artificially enhance the replenishment of groundwater by diverting surface water into aquifers",
                    "To pump out polluted water",
                    "To monitor ocean levels"
                ],
                answer: "To artificially enhance the replenishment of groundwater by diverting surface water into aquifers",
                info: "MAR involves actively putting water back into aquifers, often using infiltration basins or injection wells, to boost groundwater levels."
            },
            {
                question: "Which type of landscaping is best for water conservation?",
                options: [
                    "Lawns requiring frequent watering",
                    "Xeriscaping (landscaping with drought-tolerant plants)",
                    "Gardens with many non-native, water-intensive plants",
                    "Paved courtyards with no plants"
                ],
                answer: "Xeriscaping (landscaping with drought-tolerant plants)",
                info: "Xeriscaping reduces the need for supplemental irrigation, saving significant amounts of water."
            },
            {
                question: "Why is public awareness crucial for groundwater conservation?",
                options: [
                    "It makes people pay more for water",
                    "It encourages individual and collective action to protect groundwater resources",
                    "It makes water taste better",
                    "It causes more rainfall"
                ],
                answer: "It encourages individual and collective action to protect groundwater resources",
                info: "Informed citizens are more likely to adopt water-saving habits and support conservation policies."
            },
            {
                question: "What role do wetlands play in groundwater conservation?  ",
                options: [
                    "They consume a lot of groundwater",
                    "They help filter pollutants and recharge groundwater",
                    "They cause groundwater depletion",
                    "They are unrelated to groundwater"
                ],
                answer: "They help filter pollutants and recharge groundwater",
                info: "Wetlands act as natural sponges, slowing down runoff, filtering contaminants, and allowing water to slowly infiltrate into aquifers."
            },
            {
                question: "How does reducing chemical use in agriculture help groundwater?",
                options: [
                    "It makes crops grow faster",
                    "It prevents harmful chemicals from leaching into the groundwater",
                    "It increases water evaporation",
                    "It makes the soil less fertile"
                ],
                answer: "It prevents harmful chemicals from leaching into the groundwater",
                info: "Minimizing pesticides and synthetic fertilizers reduces the risk of these pollutants contaminating underlying aquifers."
            },
        ]
    },
];

window.quizData = quizData;
