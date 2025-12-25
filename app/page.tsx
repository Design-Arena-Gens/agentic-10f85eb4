'use client'

import { useState } from 'react'
import styles from './page.module.css'

type LessonType = 'vocabulary' | 'grammar' | 'reading' | 'listening' | null

interface VocabWord {
  word: string
  definition: string
  example: string
}

interface GrammarQuestion {
  question: string
  options: string[]
  correct: number
}

interface ReadingQuestion {
  text: string
  questions: {
    question: string
    options: string[]
    correct: number
  }[]
}

const vocabularyWords: VocabWord[] = [
  { word: 'Abundant', definition: 'Existing in large quantities', example: 'The forest has abundant wildlife.' },
  { word: 'Benevolent', definition: 'Kind and generous', example: 'She was known for her benevolent nature.' },
  { word: 'Conscientious', definition: 'Careful and diligent', example: 'He is a conscientious worker.' },
  { word: 'Diligent', definition: 'Showing care and effort', example: 'The diligent student always completes homework.' },
  { word: 'Elaborate', definition: 'Detailed and complicated', example: 'She made an elaborate plan for the party.' },
  { word: 'Facilitate', definition: 'Make an action easier', example: 'Technology can facilitate learning.' },
  { word: 'Genuine', definition: 'Real, authentic', example: 'Her concern for others is genuine.' },
  { word: 'Hazardous', definition: 'Dangerous or risky', example: 'Smoking is hazardous to your health.' },
  { word: 'Innovative', definition: 'Introducing new ideas', example: 'The company developed an innovative product.' },
  { word: 'Jubilant', definition: 'Extremely happy', example: 'The team was jubilant after winning.' },
]

const grammarQuestions: GrammarQuestion[] = [
  {
    question: 'Which sentence is correct?',
    options: [
      'She don\'t like coffee.',
      'She doesn\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She not like coffee.'
    ],
    correct: 1
  },
  {
    question: 'Choose the correct form: "I ____ to the store yesterday."',
    options: ['go', 'goes', 'went', 'going'],
    correct: 2
  },
  {
    question: 'Which is the correct plural form?',
    options: ['childs', 'childes', 'children', 'childrens'],
    correct: 2
  },
  {
    question: 'Complete: "If I ____ rich, I would travel the world."',
    options: ['am', 'was', 'were', 'be'],
    correct: 2
  },
  {
    question: 'Choose the correct article: "___ apple a day keeps the doctor away."',
    options: ['A', 'An', 'The', 'No article'],
    correct: 1
  },
]

const readingPassage: ReadingQuestion = {
  text: `The English language has a fascinating history spanning over 1,400 years. It originated from Anglo-Saxon settlers who brought their Germanic languages to Britain in the 5th century. Over time, English absorbed thousands of words from other languages, particularly Latin, French, and Norse.

Today, English is the most widely spoken language globally when combining native and non-native speakers. It serves as the primary language of international business, science, technology, and entertainment. Learning English opens doors to countless opportunities for education, career advancement, and cultural exchange.

One of the challenges of learning English is its irregular spelling and pronunciation. Unlike languages with more consistent rules, English spelling often doesn't match pronunciation due to its diverse linguistic heritage. However, with practice and exposure, learners can master these irregularities and become proficient communicators.`,
  questions: [
    {
      question: 'When did English originate?',
      options: ['3rd century', '5th century', '7th century', '10th century'],
      correct: 1
    },
    {
      question: 'Which languages influenced English vocabulary the most?',
      options: ['Spanish, Italian, Portuguese', 'Latin, French, Norse', 'Arabic, Persian, Hindi', 'Chinese, Japanese, Korean'],
      correct: 1
    },
    {
      question: 'Why is English spelling irregular?',
      options: ['It was designed that way', 'Due to its diverse linguistic heritage', 'To make it harder to learn', 'Because of modern technology'],
      correct: 1
    },
  ]
}

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<LessonType>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const resetLesson = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompleted(false)
  }

  const handleLessonSelect = (type: LessonType) => {
    setSelectedLesson(type)
    resetLesson()
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return

    setShowResult(true)

    if (selectedLesson === 'grammar') {
      if (selectedAnswer === grammarQuestions[currentIndex].correct) {
        setScore(score + 1)
      }
    } else if (selectedLesson === 'reading') {
      if (selectedAnswer === readingPassage.questions[currentIndex].correct) {
        setScore(score + 1)
      }
    }
  }

  const handleNext = () => {
    const maxIndex = selectedLesson === 'grammar'
      ? grammarQuestions.length - 1
      : selectedLesson === 'reading'
      ? readingPassage.questions.length - 1
      : vocabularyWords.length - 1

    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setCompleted(true)
    }
  }

  const renderVocabulary = () => {
    const word = vocabularyWords[currentIndex]
    return (
      <div className={styles.lessonContent}>
        <div className={styles.vocabCard}>
          <h2 className={styles.vocabWord}>{word.word}</h2>
          <div className={styles.vocabDefinition}>
            <strong>Definition:</strong> {word.definition}
          </div>
          <div className={styles.vocabExample}>
            <strong>Example:</strong> "{word.example}"
          </div>
        </div>
        <div className={styles.navigation}>
          <div className={styles.progress}>
            Word {currentIndex + 1} of {vocabularyWords.length}
          </div>
          <button onClick={handleNext} className={styles.nextButton}>
            {currentIndex < vocabularyWords.length - 1 ? 'Next Word' : 'Finish'}
          </button>
        </div>
      </div>
    )
  }

  const renderGrammar = () => {
    const question = grammarQuestions[currentIndex]
    return (
      <div className={styles.lessonContent}>
        <div className={styles.questionCard}>
          <h3 className={styles.question}>{question.question}</h3>
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                className={`${styles.optionButton} ${
                  selectedAnswer === index ? styles.selected : ''
                } ${
                  showResult && index === question.correct ? styles.correct : ''
                } ${
                  showResult && selectedAnswer === index && index !== question.correct ? styles.incorrect : ''
                }`}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div className={`${styles.result} ${selectedAnswer === question.correct ? styles.correctResult : styles.incorrectResult}`}>
              {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect. Try again next time!'}
            </div>
          )}
        </div>
        <div className={styles.navigation}>
          <div className={styles.progress}>
            Question {currentIndex + 1} of {grammarQuestions.length}
          </div>
          {!showResult ? (
            <button
              onClick={handleAnswerSubmit}
              className={styles.nextButton}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className={styles.nextButton}>
              {currentIndex < grammarQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderReading = () => {
    const question = readingPassage.questions[currentIndex]
    return (
      <div className={styles.lessonContent}>
        {currentIndex === 0 && (
          <div className={styles.readingPassage}>
            <h3>Read the following passage:</h3>
            <p>{readingPassage.text}</p>
          </div>
        )}
        <div className={styles.questionCard}>
          <h3 className={styles.question}>{question.question}</h3>
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                className={`${styles.optionButton} ${
                  selectedAnswer === index ? styles.selected : ''
                } ${
                  showResult && index === question.correct ? styles.correct : ''
                } ${
                  showResult && selectedAnswer === index && index !== question.correct ? styles.incorrect : ''
                }`}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div className={`${styles.result} ${selectedAnswer === question.correct ? styles.correctResult : styles.incorrectResult}`}>
              {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect. Try again next time!'}
            </div>
          )}
        </div>
        <div className={styles.navigation}>
          <div className={styles.progress}>
            Question {currentIndex + 1} of {readingPassage.questions.length}
          </div>
          {!showResult ? (
            <button
              onClick={handleAnswerSubmit}
              className={styles.nextButton}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className={styles.nextButton}>
              {currentIndex < readingPassage.questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderCompleted = () => {
    const totalQuestions = selectedLesson === 'grammar'
      ? grammarQuestions.length
      : readingPassage.questions.length

    return (
      <div className={styles.completedCard}>
        <h2>Lesson Complete!</h2>
        {selectedLesson !== 'vocabulary' && (
          <div className={styles.scoreDisplay}>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreNumber}>{score}</span>
              <span className={styles.scoreTotal}>/ {totalQuestions}</span>
            </div>
            <p className={styles.scoreText}>
              {score === totalQuestions ? 'Perfect score!' :
               score >= totalQuestions * 0.7 ? 'Great job!' :
               score >= totalQuestions * 0.5 ? 'Good effort!' :
               'Keep practicing!'}
            </p>
          </div>
        )}
        <div className={styles.completedButtons}>
          <button onClick={resetLesson} className={styles.retryButton}>
            Try Again
          </button>
          <button onClick={() => setSelectedLesson(null)} className={styles.homeButton}>
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          {renderCompleted()}
        </div>
      </main>
    )
  }

  if (selectedLesson) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <button onClick={() => setSelectedLesson(null)} className={styles.backButton}>
            ← Back
          </button>
          {selectedLesson === 'vocabulary' && renderVocabulary()}
          {selectedLesson === 'grammar' && renderGrammar()}
          {selectedLesson === 'reading' && renderReading()}
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Learn English</h1>
        <p className={styles.subtitle}>Choose a lesson to begin your learning journey</p>

        <div className={styles.lessonGrid}>
          <div className={styles.lessonCard} onClick={() => handleLessonSelect('vocabulary')}>
            <div className={styles.lessonIcon}>📚</div>
            <h2>Vocabulary</h2>
            <p>Learn new words with definitions and examples</p>
          </div>

          <div className={styles.lessonCard} onClick={() => handleLessonSelect('grammar')}>
            <div className={styles.lessonIcon}>✏️</div>
            <h2>Grammar</h2>
            <p>Master English grammar rules with interactive exercises</p>
          </div>

          <div className={styles.lessonCard} onClick={() => handleLessonSelect('reading')}>
            <div className={styles.lessonIcon}>📖</div>
            <h2>Reading</h2>
            <p>Improve comprehension with passages and questions</p>
          </div>

          <div className={styles.lessonCard} onClick={() => handleLessonSelect('listening')}>
            <div className={styles.lessonIcon}>🎧</div>
            <h2>Listening</h2>
            <p>Coming soon: Audio exercises to enhance listening skills</p>
          </div>
        </div>

        <div className={styles.features}>
          <h3>Why Learn English?</h3>
          <ul>
            <li>🌍 Spoken by over 1.5 billion people worldwide</li>
            <li>💼 Essential for international business and careers</li>
            <li>🎓 Access to world-class education and resources</li>
            <li>✈️ Travel confidently to English-speaking countries</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
