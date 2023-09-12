import './MetronomeContainer.css';

interface ContainerProps {
  name: string;
}

const MetronomeContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>IDK, just imagine a metronome is here.</p>
    </div>
  );
};

export default MetronomeContainer;
