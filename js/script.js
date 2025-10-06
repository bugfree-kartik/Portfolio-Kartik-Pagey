let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    header.classList.remove('active');
}

let cursor1 = document.querySelector('.cursor-1');
let cursor2 = document.querySelector('.cursor-2');

window.onmousemove = (e) =>{
    cursor1.style.top = e.pageY + 'px';
    cursor1.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
}

document.querySelectorAll('a').forEach(links =>{

    links.onmouseenter = () =>{
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    }

    links.onmouseleave = () =>{
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    }

});













const slider = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

// Create pagination dots
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
});

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll('.dots span').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
};

updateSlider();

// ===== MODAL Logic =====
const modal = document.getElementById('project-modal');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.querySelector('.close-modal');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');

const projectsData = [
  {
    title: "AskYourDocument",
    overview: "A Retrieval-Augmented Generation (RAG) application that enables intelligent Q&A over documents and web content using FAISS, SBERT, and Google Generative AI.",
    details: `
      <ul>
        <li>Developed an end-to-end Retrieval-Augmented Generation (RAG) application integrating FAISS-based semantic vector search with Sentence-BERT embeddings to deliver context-aware query responses from unstructured text sources.</li>  
        <li>Built a FastAPI backend for document ingestion, text chunking, embedding generation, and retrieval; exposed REST APIs for seamless integration with downstream applications.</li>  
        <li>Designed and implemented a Streamlit-based interactive frontend enabling users to upload documents (PDF/DOCX/TXT), perform semantic search, and receive LLM-powered contextual answers with improved retrieval accuracy.</li>  

      </ul>
    `
  },
  {
    title: "SmartApply",
    overview: "A Gradio-based resume analysis app leveraging Google Gemini API to generate ATS match %, summaries, and skill insights.",
    details: `
      <ul>
        <li>Developed a resume parsing pipeline using PyPDF2 and integrated Google Gemini API with a Gradio-based UI for ATS match scoring, keyword gap analysis, and skill improvement suggestions.</li>
        <li>Designed modular prompt workflows to generate structured outputs including profile summaries, improvement tips, and JSON insights for downstream use.</li>
        <li>Deployed the application on Hugging Face Spaces for public accessibility, enabling real-time interactive resume–job description analysis.</li>
        <li>Implemented robust error handling covering API key management, file parsing issues, and invalid user inputs to ensure seamless user experience.</li>
      </ul>
    `
  },
  {
    title: "ScoreCast - Academic Score Forecasting",
    overview: "ML framework to forecast math scores.",
    details: `
      <ul>
        <li>Developed a web app with Flask, HTML & CSS to forecast math scores from user input.</li>
        <li>Optimized data loading, preprocessing & transformation pipelines, incorporating one-hot encoding for categorical features.</li>
        <li>Trained models: Random Forest, XGBoost, CatBoost, Gradient Boosting, AdaBoost, Decision Tree & Linear Regression.</li>
        <li>Selected best model using R² score and GridSearchCV (R² = 0.868).</li>
        <li>Improved accuracy and generalization through hyperparameter tuning.</li>
      </ul>
    `
  },
  {
    title: "CensusIncome-Classifier",
    overview: "Income classification using AIC and ensemble models.",
    details: `<ul>
  <li>Developed a supervised ML pipeline to classify income levels using the UCI Adult Census dataset.</li>
  <li>Implemented AIC-based forward feature selection to identify optimal minimal feature set.</li>
  <li>Trained and compared multiple classifiers: Logistic Regression, KNN, Decision Tree, Random Forest, XGBoost, AdaBoost, and Gradient Boosting.</li>
  <li>Evaluated models using cross-validation, confusion matrix, sensitivity/specificity, AUC-ROC curves, and accuracy score.</li>
  <li>Concluded Random Forest as the best-performing model with 92.75% test accuracy and highest AUC score.</li>
</ul>`
  },
  {
    title: "ConversionFlow Analyzer",
    overview: "Funnel analysis dashboard with Power BI.",
    details: `<ul>
  <li>Built an interactive Power BI dashboard to analyze Swiggy’s e-commerce funnel performance.</li>
  <li>Cleaned and transformed raw data, handled missing values, and created calculated fields using DAX.</li>
  <li>Conducted funnel analysis focusing on traffic sources, session metrics, and conversion stages (L2M, M2C, C2P, P2O).</li>
  <li>Tracked order volume fluctuations and conversion rate trends compared to historical benchmarks.</li>
  <li>Designed dynamic dashboards with KPIs and filters to identify key performance shifts and data-driven insights.</li>
</ul>`
  },
  {
    title: "AirlineDB Insights",
    overview: "Advanced SQL query analysis on airline data.",
    details: `<ul>
  <li>Analyzed airline database to extract KPIs like on-time performance, revenue per flight, and occupancy rate.</li>
  <li>Wrote complex SQL queries using joins to integrate data from multiple tables for unified reporting.</li>
  <li>Used SQL window functions to calculate running totals and rank flight routes by demand and occupancy (95% accuracy).</li>
  <li>Applied CASE statements to enable dynamic flight categorization based on delay status, ticket class, and demographics.</li>
  <li>Built operational dashboards to visualize insights and support data-driven airline strategy.</li>
</ul>`
  }
];

document.querySelectorAll('.project-card').forEach(card => {
  card.querySelector('.read-more-btn').addEventListener('click', () => {
    const index = parseInt(card.dataset.index);
    showModal(index);
  });
});

function showModal(index) {
  const project = projectsData[index];
  modalInfo.innerHTML = `
    <h2>${project.title}</h2>
    <h3>Overview</h3>
    <p>${project.overview}</p>
    <h3>Details</h3>
    <p>${project.details}</p>
  `;
  modal.style.display = 'flex';
  modal.dataset.current = index;
}

closeModal.onclick = () => {
  modal.style.display = 'none';
};

modalPrev.onclick = () => {
  let idx = parseInt(modal.dataset.current);
  idx = (idx - 1 + projectsData.length) % projectsData.length;
  showModal(idx);
};

modalNext.onclick = () => {
  let idx = parseInt(modal.dataset.current);
  idx = (idx + 1) % projectsData.length;
  showModal(idx);
};





VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 300.00,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0xffffff,         // white lines
  backgroundColor: 0x000000, // black background
  points: 8.0,
  maxDistance: 20.0,
  spacing: 18.0
})




 