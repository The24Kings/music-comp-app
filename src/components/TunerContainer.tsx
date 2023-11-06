import './TunerContainer.css';

interface ContainerProps {
  name: string;
}

const TunerContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Tuner? I Hardly Know Her!</p>
    </div>
  );
};

export default TunerContainer;
