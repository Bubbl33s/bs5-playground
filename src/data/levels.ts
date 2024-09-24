type LevelData = {
  id: number;
  content: string;
  template?: string;
};

export const levelsData: LevelData[] = [
  {
    id: 1,
    content: `<p class="text-center">Hello World!</p>`,
  },
  {
    id: 2,
    content: `<p class="">start</p>
<p class="text-center">center</p>
<p class="text-end">end</p>
`,
  },
  {
    id: 3,
    content: `<p class="text-center text-danger">Hello World!</p>`,
  },
];
