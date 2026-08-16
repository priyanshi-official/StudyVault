import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaVideo } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import './Resources.css'

const Resources = () => {
  const [activeTab, setActiveTab] = useState("video")
  const [video, setvideo] = useState([])
  const [pdf, setpdf] = useState([])


  const [showModal, setShowModal] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [videoLink, setVideoLink] = useState("")
  const [pdfTitle, setPdfTitle] = useState("")
  const [pdfFile, setPdfFile] = useState("")

  const displayModal = () =>{
    if(!showModal)
      return

    return(
      <div className="modal-container">

        <div className="modal">
          {activeTab==="video" ?
          <>
            <h2>Add video</h2>
            <label htmlFor="title">Video Title</label>
            <input type="text" id="title" value={videoTitle} onChange={(e)=>{setVideoTitle(e.target.value)}}/>

            <label htmlFor="link">Video Link</label>
            <input type="text" id="link" value={videoLink} onChange={(e)=>{setVideoLink(e.target.value)}}/>
          </> : 
          <>
            <h2>Add PDF</h2>
            <label htmlFor="title">PDF Title</label>
            <input type="text" id="title" value={pdfTitle} onChange={(e)=>{setPdfTitle(e.target.value)}}/>

            <label htmlFor="file">PDF File</label>
            <input type="file" accept=".pdf" onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) 
                      return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setPdfFile(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}/>
          </>}

          <div className="modal-buttons">
            <button className='cancel-btn' onClick={closeModal}><FaTimes/></button>
            <button className='save-btn' onClick={saveResource}><FaSave/></button>
          </div>
        </div>
      </div>
    )
  }


  const saveResource =()=>{
    if(activeTab ==="video")
    {
      if(videoTitle === "" || videoLink === ""){
        alert("Enter details")
        return
      }

      console.log(videoLink);
      console.log(getThumbnail(videoLink));
        
      const newVideo = {
        id:Date.now(),
        title:videoTitle,
        link:videoLink,
      }
      setvideo([...video,newVideo])
    }

    else{
      if(pdfTitle === "" || !pdfFile){
        alert("Enter details")
        return
      }

      const newPdf = {
        id:Date.now(),
        title:pdfTitle,
        file:pdfFile
      }
      setpdf([...pdf,newPdf])
    }
    setVideoTitle("");
    setVideoLink("");
    setPdfTitle("");
    setPdfFile("");
    setShowModal(false);
  }


  const deleteVideo=(id)=>{
    const updatedVideo = video.filter((item)=> item.id!==id)
    setvideo(updatedVideo)
  }
  const deletePdf=(id)=>{
    const updatedPdf = pdf.filter((item)=> item.id!==id)
    setpdf(updatedPdf)
  }


  const closeModal = () => {
    setShowModal(false);
    setVideoTitle("");
    setVideoLink("");
    setPdfTitle("");
    setPdfFile("");
  }

  useEffect(() => {
  const savedVideos = JSON.parse(localStorage.getItem("videos")) || [];
  const savedPdfs = JSON.parse(localStorage.getItem("pdfs")) || [];
  setvideo(savedVideos);
  setpdf(savedPdfs);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(video));
  }, [video]);
  useEffect(() => {
    localStorage.setItem("pdfs", JSON.stringify(pdf));
  }, [pdf]);


  return (
   <div className="resource-page">
     <div className='resources-container'>
      <div className="resources-header">
        <h1>Learning Resources</h1>
        <p>Save your video lectures and PDFs in one place</p>
      </div>

      <div className="resource-tabs">
        <h4>Select what you'd like to add</h4>
        <button className={activeTab==="video" ? "active-tab" : ""}  onClick={()=>{setActiveTab("video"), setShowModal(true)}}>Add video</button>
        <button className={activeTab==="pdf" ? "active-tab" : ""}  onClick={()=>{setActiveTab("pdf"), setShowModal(true)}}>Add PDF</button>
      </div>

      {displayModal()}

{/* Video */}
      {activeTab === "video" && (
        <div className="video-section">

          {video.map((item) => (
            <div className="video-card" key={item.id}>
                  <div className="video-content">
                      <h3>{item.title}</h3>
                      <div className="resource-actions">
                         <a href={item.link} target="_blank"  rel="noreferrer" className="watch-btn" >
                          <FaYoutube />Watch Video </a>

                          <FaTrash  className="delete-resource"  onClick={() => deleteVideo(item.id)}  />
                      </div>
                  </div>
              </div>
          ))}
        </div>
      )}


{/* pdf */}
      {activeTab === "pdf" && (
          <div className="pdf-section">

            {pdf.map((item) => (
              <div className="pdf-card" key={item.id}>
                <div className="pdf-content">
                  <h3>{item.title}</h3>
                  <div className="resource-actions">
                     <a href={item.file} target="_blank" rel="noreferrer" className="open-btn" >
                    <FaFilePdf /> Open PDF</a>

                    <FaTrash className="delete-resource" onClick={() => deletePdf(item.id)}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


    </div>

    <div className="footer">
         <p> ©2026 Study<span className='vault'>Vault</span>.  All rights reserved.</p>
      </div>
   </div>
    
  )
}

export default Resources
