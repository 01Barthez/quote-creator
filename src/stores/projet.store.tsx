import { create } from "zustand";

type statusPhase = "pending" | "completed";
type statusProjet = "draft" | "pending" | "validated";

type Material = {
    materiel: string;
    quantite: string;
};

type Phase = {
    numeroPhase: number;
    name: string;
    description: string;
    status: statusPhase;
    startDate: string;
    endDate: string;
    materials: Material[];
};

export type Project = {
    name: string;
    description: string;
    slug: string;
    status: statusProjet;
    phases: Phase[];
};

type ProjectStore = {
    project: Project | null;
    setProject: (project: Project|null) => void;
    addPhase: (phase: Phase) => void;
    addMaterialToPhase: (numeroPhase: number, material: Material) => void;
    updateProjectStatus: (status: statusProjet) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
    project: null,

    setProject: (project) => set({ project }),

    addPhase: (phase) =>
        set((state) => ({
            project: state.project
                ? { ...state.project, phases: [...state.project.phases, phase] }
                : null,
        })),

    addMaterialToPhase: (numeroPhase, material) =>
        set((state) => ({
            project: state.project
                ? {
                    ...state.project,
                    phases: state.project.phases.map((phase) =>
                        phase.numeroPhase === numeroPhase
                            ? { ...phase, materials: [...phase.materials, material] }
                            : phase
                    ),
                }
                : null,
        })),

    updateProjectStatus: (status) =>
        set((state) => ({
            project: state.project ? { ...state.project, status } : null,
        })),
}));