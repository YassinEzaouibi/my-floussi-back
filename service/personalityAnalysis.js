const personalityAnalysis = {
    Prudent: {
        toleranceRisk: "Très faible",
        objectives:
            "Préserver le capital et maintenir une faible volatilité dans le portefeuille.",
        investmentStrategy:
            "Privilégie les investissements sûrs et stables tels que les obligations d'État, les comptes d'épargne, et les certificats de dépôt.",
        investmentHorizon: "Court à moyen terme",
        profile:
            "Convient aux investisseurs qui sont préoccupés par la perte de leur capital et qui préfèrent une croissance lente mais régulière de leur investissement.",
    },
    Modere: {
        toleranceRisk: "Modérée",
        objectives: "Équilibre entre la préservation du capital et la croissance.",
        investmentStrategy:
            "Combinaison d'investissements stables et de placements légèrement plus risqués. Peut inclure un mix d'obligations, d'actions de grandes entreprises, et de fonds mutuels.",
        investmentHorizon: "Moyen terme",
        profile:
            "Adapté aux investisseurs qui sont prêts à accepter un certain niveau de risque pour obtenir de meilleurs rendements, tout en évitant les grandes fluctuations du marché.",
    },
    Dynamic: {
        toleranceRisk: "Élevée",
        objectives: "Croissance active du capital.",
        investmentStrategy:
            "Portefeuille composé principalement d'actions, y compris des actions de croissance et des investissements dans des secteurs émergents ou volatils.",
        investmentHorizon: "Long terme",
        profile:
            "Convient aux investisseurs qui sont prêts à accepter des fluctuations de marché importantes pour réaliser des gains potentiels plus élevés.",
    },
    Agressif: {
        toleranceRisk: "Très élevée",
        objectives: "Maximisation du rendement, indépendamment des risques élevés.",
        investmentStrategy:
            "Investissements hautement spéculatifs, tels que les actions de petites entreprises, les marchés émergents, les options, et les matières premières.",
        investmentHorizon: "Très long terme ou flexible",
        profile:
            "Idéal pour les investisseurs qui sont prêts à risquer une grande partie de leur capital pour des rendements potentiellement élevés et qui ont la capacité financière de supporter des pertes importantes.",
    },
};

module.exports = personalityAnalysis ;