import './RecordContainer.css';
import { useState, useRef } from "react";
import VideoRecorder from '../components/VideoRecorder';
import AudioRecorder from '../components/AudioRecorder';
interface ContainerProps {
  name: string;
}

const RecordContainer: React.FC<ContainerProps> = ({ name }) => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };

    return (

        <div>
            <h1>React Media Recorder</h1>
            <div className="button-flex">
                <button onClick={toggleRecordOption("video")}>
                  Record Video
                </button>
                <button onClick={toggleRecordOption("audio")}>
                  Record Audio
                </button>
            </div>
            <div>
                {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
            </div>
        </div>

        /*<div className='container'>
            <strong>{name}</strong>
            <p>Help me</p>
        </div>*/
    );
};

export default RecordContainer;
