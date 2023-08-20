import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Secondary Button',
  },
};

export const Error: Story = {
  args: {
    color: 'error',
    label: 'Error Button',
  },
};

export const Outlined: Story = {
  args: {
    color: 'primary',
    variant: 'outlined',
    label: 'Outlined Button',
  },
};

export const Large: Story = {
  args: {
    color: 'primary',
    size: 'large',
    label: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    color: 'primary',
    size: 'small',
    label: 'Small Button',
  },
};
