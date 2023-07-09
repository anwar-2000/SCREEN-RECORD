import React from 'react'
import styles from "../styles/examples.module.css"
import Card from './Card';

const examples = [
  {
    titre: "Website Tutorial",
    description: "Record your screen while navigating and using a website to create a tutorial guiding users on how to navigate its features and functionality."
  },
  {
    titre: "User Testing and Feedback",
    description: "Allow users to record their screen while using your website to gather feedback, identify usability issues, and improve the user experience."
  },
  {
    titre: "Website Debugging and Issue Reporting",
    description: "Utilize the screen recording feature to capture and demonstrate any bugs, errors, or issues encountered on the website, making it easier for developers to understand and resolve them."
  },
  {
    titre: "Collaborative Web Development",
    description: "Enable web developers and designers to record their screen while working on a website collaboratively, facilitating communication and knowledge sharing among team members."
  },
  {
    titre: "Remote Webinars and Presentations",
    description: "Provide a platform for hosting webinars and presentations where speakers can record their screen to deliver engaging and informative content to remote attendees."
  },
  {
    titre: "E-Learning and Online Courses",
    description: "Allow educators and trainers to record their screen during online courses, lectures, or tutorials, providing students with valuable learning materials and resources."
  },
  {
    titre: "Product Walkthrough and Demonstrations",
    description: "Enable businesses to create product walkthrough videos by recording the screen, showcasing the features, functionalities, and benefits of their website or online services."
  },
  {
    titre: "Website Performance Analysis",
    description: "Allow website owners and developers to record the user journey on their website to analyze user behavior, identify pain points, and optimize the website's performance."
  },
  {
    titre: "Virtual Meetings and Conferencing",
    description: "Provide a screen recording feature for virtual meetings and conferences, allowing participants to capture and review important discussions, presentations, and collaborations."
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