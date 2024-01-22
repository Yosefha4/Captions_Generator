"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { clearTranscriptionItems } from "../libs/awsTranscribHelpers";
import TransItem from "@/components/TransItem";
import SparksIcon from "@/components/SparksIcon";
import VideoResult from "@/components/VideoResult";
import TransEditor from "@/components/TransEditor";
import ResultVideo from "@/components/ResultVideo.js";

const FilePage = ({ params }) => {
  const filename = params.filename;

  const [inProgress, setInProgress] = useState(false);
  const [isFetchInfo, setIsFetchInfo] = useState(false);
  const [awsTransItem, setAwsTransItem] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  // function getTranscription() {
  //   setIsFetchInfo(true);
  //   axios.get("/api/transcription?filename="+filename).then((response) => {
  //     setIsFetchInfo(false);
  //     const status = response.data?.status;
  //     const transcription = response.data?.transcription;

  //     if (status === "IN_PROGRESS") {
  //       setInProgress(true);
  //       setTimeout(getTranscription, 3000);
  //     } else {
  //       setInProgress(false);

  //       setAwsTransItem(clearTranscriptionItems(transcription?.results.items));
  //     }
  //   });
  // }

  function getTranscription() {
    setIsFetchInfo(true);
    axios.get('/api/transcription?filename='+filename).then(response => {
      setIsFetchInfo(false);
      const status = response.data?.status;
      const transcription = response.data?.transcription;
      if (status === 'IN_PROGRESS') {
        setInProgress(true);
        setTimeout(getTranscription, 3000);
      } else {
        setInProgress(false);

        setAwsTransItem(
          clearTranscriptionItems(transcription.results.items)
        );
      }
    });
  }

  if (inProgress) {
    return <div>Transcribing your video...</div>;
  }
  
  if (isFetchInfo) {
    return <div>Fetching information...</div>;
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-16">
        <div className="">
          <h2 className="text-2xl mb-4 text-white/60">Transcribtion</h2>
          <TransEditor
            awsTransItem={awsTransItem}
            setAwsTransItem={setAwsTransItem}
          />
        </div>
        <div>
          <h2 className="text-2xl mb-4 text-white/60">Result</h2>
          <VideoResult filename={filename} transcriptionItems={awsTransItem} />
          {/* <ResultVideo
            filename={filename}
            transcriptionItems={awsTransItem} /> */}
        </div>
      </div>
    </div>
  );
};

export default FilePage;
