export const REGEX_Password: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
import type { IProject } from "@/interface/interface";

export const project: IProject = {
    name: "Construction du pont de la sanaga",
    description:" Financé par l'Etat camerounais, nous nous donnons pour objectif de construire le pont de la sanaga de A à Z, afin de satisfaire la population locale !",
    slug: "construction-du-pont de-la-sanaga",
    status: "draft",
    phases: [
        {
            numeroPhase: 1,
            name: "Etablissement du cahier de charge fonctionnel",
            description: "Nécessite un cahier de charge fonctionnel afin de spécifier en détail le besoin",
            status: "pending",
            startDate: "2025-01-01",
            endDate: "2025-01-06",
           
            materials: [
                {
                    materiel: "cahier",
                    quantite: 1,
                },

                {
                    materiel: "stylo",
                    quantite: 3,
                },
            ]
        },

        {
            numeroPhase: 2,
            name: "Etablissement du cahier de charge technique",
            description: "Nécessite un cahier de charge technique pour spécifier les besoins techniques pour la réalisation du projet",
            status: "pending",
            startDate: "2025-01-04",
            endDate: "2025-01-10",
           
            materials: [
                {
                    materiel: "format",
                    quantite: 10,
                },

                {
                    materiel: "stylo",
                    quantite: 1,
                },
            ]
        },

        {
            numeroPhase: 3,
            name: "Coulages du pont",
            description: "Débarrasage des emcombrements sur le terrain de construction",
            status: "pending",
            startDate: "2025-01-16",
            endDate: "2025-01-20",
           
            materials: [
                {
                    materiel: "pelles",
                    quantite: 4,
                },

                {
                    materiel: "pioches",
                    quantite: 3,
                },

                {
                    materiel: "brouette",
                    quantite: 5,
                },

                {
                    materiel: "machette",
                    quantite: 10,
                },
            ]
        },

        {
            numeroPhase: 4,
            name: "Fondations du pont",
            description: "Débarrasage des emcombrements sur le terrain de construction",
            status: "pending",
            startDate: "2025-01-13",
            endDate: "2025-06-06",
           
            materials: [
                {
                    materiel: "pierre",
                    quantite: 10,
                },

                {
                    materiel: "gravier",
                    quantite: 3,
                },

                {
                    materiel: "eau",
                    quantite: 50,
                },
            ]
        },

        {
            numeroPhase: 5,
            name: "Coulages et finissions du pont",
            description: "Débarrasage des emcombrements sur le terrain de construction",
            status: "pending",
            startDate: "2025-05-05",
            endDate: "2025-11-20",
           
            materials: [
                {
                    materiel: "ciments",
                    quantite: 20,
                },

                {
                    materiel: "sables",
                    quantite: 3,
                },

                {
                    materiel: "gravier",
                    quantite: 5,
                },
            ]
        },
    ]
} 