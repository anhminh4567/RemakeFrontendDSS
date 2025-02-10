import { useAuthContext } from "@/context/useAuthContext";
import PageContainer from "@/layouts/PageContainer";
import Login from "@/pages/authentication/Login";
import Home from "@/pages/home";
import { Route, Routes } from "react-router-dom";

export type RouteProps = {
  path: string;
  name: string;
  element: React.ComponentType;
};

export const PublicRoutes: { [Name: string]: number } = {};

export const AllRoutes = {
  ...PublicRoutes,
};
