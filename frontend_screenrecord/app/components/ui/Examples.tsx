import React from 'react'
import styles from "../styles/examples.module.css"
import Card from './Card';

const examples = [
  {
    titre: "Software Tutorial",
    description: "Record your screen to create a tutorial on how to use a specific software application."
  },
  {
    titre: "Webinar Presentation",
    description: "Use an online screen recorder to capture your presentation and share it with remote attendees of a webinar."
  },
  {
    titre: "Gaming Highlight Reel",
    description: "Record your gaming sessions using an online screen recorder to capture exciting moments and create a highlight reel."
  },
  {
    titre: "Remote Training Session",
    description: "Record your screen during a remote training session to provide participants with a reference video for future learning and review."
  },
  {
    titre: "Bug Report Demonstration",
    description: "Use an online screen recorder to capture and demonstrate software bugs or issues for better communication with developers and troubleshooting."
  },
  {
    titre: "Digital Art Creation Process",
    description: "Record your screen while creating digital art to showcase your artistic process, techniques, and workflow to inspire and educate others."
  },
  {
    titre: "Product Demo Video",
    description: "Create a product demo video by recording your screen to showcase the features, functionality, and benefits of a product or service."
  },
  {
    titre: "User Experience Testing",
    description: "Record user interactions and behaviors on a website or application to gather insights and analyze the user experience for improvements."
  },
  {
    titre: "Virtual Classroom Session",
    description: "Record virtual classroom sessions to provide students with review materials or as a resource for those who missed the live session."
  }
];

type Item = {
  titre : string,
  description : string
}
const Examples = () => {
  return <div className={styles.container}>
    <h1> Use Case Examples</h1>
    <div className={styles.items}>
          {examples.map((item : Item)=>(
            <Card titre={item.titre} description={item.description}  key={item.titre}/>
          ))}
    </div>
  </div>
}

export default Examples