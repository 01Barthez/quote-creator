import type { IProjectStore } from "@/interface/interface";
import { create } from "zustand";

export const useProjectStore = create<IProjectStore>((set) => ({
    project: null,
    hasSeenSuccess: false,

    setProject: (project) =>
        set({
            project,
            hasSeenSuccess: false
        }),

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

    markSuccessSeen: () => set({ hasSeenSuccess: true }),
}));