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

