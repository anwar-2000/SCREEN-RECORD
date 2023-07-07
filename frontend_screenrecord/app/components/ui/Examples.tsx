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
            <Card titre={item.titre} description={item.description} />
          ))}
    </div>
  </div>
}

export default Examples