import type { ReactNode } from "react";
import type React from "react";

export interface ISEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  favicon?: string;
}

export interface ISocialLink {
  id: string,
  url: string,
  name: string,
  icon: ReactNode,
}

export interface IFootersLinks {
  id?: string,
  title: string,
  links: { // For differents links
    url: string;
    name: string;
  }[],
}
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (url: string) => Promise<void>;
}

export interface IPrivateRouteProps {
  children: ReactNode
}

export interface ILogoProps {
  isDarkZone?: boolean;
}

export interface ILinkCategory {
  id: string;
  icon: ReactNode;
  name: string;
  href: string;
}

export interface ICTA extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  url: string
}


type statusPhase = "pending" | "completed";
type statusProjet = "draft" | "pending" | "validated";

export interface IMaterial {
    materiel: string;
    quantite: string;
};

export interface IPhase {
    numeroPhase: number;
    name: string;
    description: string;
    status: statusPhase;
    startDate: string;
    endDate: string;
    materials: IMaterial[];
};

export interface IProject {
    name: string;
    description: string;
    slug: string;
    status: statusProjet;
    phases: IPhase[];
  };
  
  export interface IProjectStore {
    project: IProject | null;
    hasSeenSuccess: boolean;
    setProject: (project: IProject|null) => void;
    addPhase: (phase: IPhase) => void;
    addMaterialToPhase: (numeroPhase: number, material: IMaterial) => void;
    updateProjectStatus: (status: statusProjet) => void;
    markSuccessSeen: () => void;
};
