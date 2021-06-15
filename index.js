import { AppNav } from "./navigation/AppNavigator";
import { AppState } from "./context/app/AppState";
import React from "react";

export const Index = () => {
  return (
    <AppState>
      <AppNav />
    </AppState>
  );
};
