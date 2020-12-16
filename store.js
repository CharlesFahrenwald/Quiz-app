const store = {
    
    questions: [
      {
        question: 'Who produced the first car in the U.S?',
        answers: [
          'Harrison Ford',
          'Henry Ford',
          'Thmoas Edison',
          'Clara Bryant Ford'
        ],
        correctAnswer: 'Henry Ford'
      },
      {
        question: 'Who invented the light bulb?',
        answers: [
          'Ben Franklin',
          'Paul Revere',
          'Thmoas Edison',
          'Abraham Lincoln'
        ],
        correctAnswer: 'Thomas Edison'
      },
      {
        question: 'Who was the first President?',
        answers: [
            'George Washington',
            'Abraham Lincoln',
            'John F Kennedy',
            'Wopdrow Wilson'
        ],
        correctAnswer: 'George Washington'
      },
      {
          question: 'Who invented the airplane?',
          answers: [
              'Wright brothers',
              'Mario brothers',
              'Kenndey brothers',
              'James brothers',
          ],
          correctAnswer: 'Wright brothers'
        },
          {
              question: 'Who abolished slavery?',
              answers: [
                  'George Washington',
                  'Ben Franklin',
                  'Abraham Lincoln',
                  'Teddy Roosvelt',
              ],
              correctAnswer: 'Abraham Lincoln'
      }
    ], 
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };