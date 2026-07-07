export interface Color {
  name: string;
}
export interface ColorPalette {
  id: string;
  title: string;
  description: string;
  colors: Color[];
}

export type ColorRequest = Pick<ColorPalette, "title" | "description" | "colors">;
