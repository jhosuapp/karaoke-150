import { TargetAndTransition, VariantLabels } from "framer-motion";

export type PartialMotionVariants = {
    initial?: TargetAndTransition | VariantLabels | boolean;
    animate?: TargetAndTransition | VariantLabels;
    exit?: TargetAndTransition | VariantLabels;
};

export type HeadItemWrapperTables = string[];
export type BodyItemPrimaryWrapperTables = {
  position: string;
  name: string;
  score: number;
};

export type BodyItemSecondaryWrapperTables = {
  date: string;
  score: number;
};

export type BodyItemTertiaryWrapperTables = {
  position: string;
  score: number;
};