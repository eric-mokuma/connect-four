// Define the props that the Button component will accept
interface ButtonProps {
  // A function that will be called when the button is clicked
  onClick: () => void
  // The content to be displayed inside the button (can be text or other elements)
  children: React.ReactNode
}

// Define the Button component that accepts ButtonProps
export default function Button({ onClick, children }: ButtonProps) {
  // Render a button element that triggers the onClick function when clicked
  return <button onClick={onClick}>{children}</button>
}
