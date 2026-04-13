import type { Module } from '../types'

export const earTrainingModules: Module[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 1: Interval Recognition
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ear-m1',
    courseId: 'ear-training',
    title: 'Interval Recognition',
    description: 'Learn to identify musical intervals using mnemonics, descriptions, and conceptual understanding.',
    icon: '🎵',
    order: 0,
    lessons: [
      {
        id: 'ear-m1-l1',
        title: 'Basic Intervals & Song Mnemonics',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m1-l1-q1',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'Which famous song opening is commonly used as a mnemonic for an ascending perfect fourth?',
            options: [
              '"Here Comes the Bride"',
              '"Twinkle, Twinkle, Little Star"',
              '"My Bonnie Lies Over the Ocean"',
              '"Star Wars" main theme'
            ],
            correctAnswer: 0,
            explanation: 'The opening two notes of "Here Comes the Bride" (Wagner\'s Bridal Chorus) form an ascending perfect fourth. This is one of the most widely used interval mnemonics in ear training.',
            reference: 'Ear Training Ch. 1'
          },
          {
            id: 'ear-m1-l1-q2',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'The opening interval of "Twinkle, Twinkle, Little Star" (ascending) is a:',
            options: [
              'Perfect fifth',
              'Major third',
              'Perfect fourth',
              'Major second'
            ],
            correctAnswer: 0,
            explanation: 'The first two notes of "Twinkle, Twinkle, Little Star" span an ascending perfect fifth (e.g., C up to G). This is also the same interval that opens "Star Wars."',
            reference: 'Ear Training Ch. 1'
          },
          {
            id: 'ear-m1-l1-q3',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'A major second is the interval between which two notes?',
            options: [
              'C and D',
              'C and E',
              'C and F',
              'C and G'
            ],
            correctAnswer: 0,
            explanation: 'A major second spans two half steps (one whole step). C to D is a major second. This is the interval you hear at the start of a major scale (do to re).',
            reference: 'Ear Training Ch. 1'
          },
          {
            id: 'ear-m1-l1-q4',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'Which song mnemonic is commonly associated with an ascending minor third?',
            options: [
              '"Greensleeves" (first two notes)',
              '"Somewhere Over the Rainbow"',
              '"Here Comes the Bride"',
              '"Twinkle, Twinkle, Little Star"'
            ],
            correctAnswer: 0,
            explanation: 'The opening interval of "Greensleeves" is an ascending minor third (three half steps). Other common mnemonics for a minor third include the "na-na na-na boo-boo" playground chant.',
            reference: 'Ear Training Ch. 1'
          },
          {
            id: 'ear-m1-l1-q5',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'How many half steps are in a perfect fifth?',
            options: [
              '7 half steps',
              '5 half steps',
              '6 half steps',
              '8 half steps'
            ],
            correctAnswer: 0,
            explanation: 'A perfect fifth contains 7 half steps (e.g., C to G: C-C#-D-D#-E-F-F#-G). It is one of the most consonant intervals and forms the basis of power chords in rock music.',
            reference: 'Ear Training Ch. 1'
          }
        ]
      },
      {
        id: 'ear-m1-l2',
        title: 'Larger Intervals & Tritones',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m1-l2-q1',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'The tritone (augmented fourth / diminished fifth) contains how many half steps?',
            options: [
              '6 half steps',
              '5 half steps',
              '7 half steps',
              '8 half steps'
            ],
            correctAnswer: 0,
            explanation: 'The tritone spans exactly 6 half steps, dividing the octave perfectly in half. Historically called "diabolus in musica" (the devil in music), it has a distinctly unstable, tense sound.',
            reference: 'Ear Training Ch. 2'
          },
          {
            id: 'ear-m1-l2-q2',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'Which song opening is a well-known mnemonic for an ascending major sixth?',
            options: [
              '"My Bonnie Lies Over the Ocean"',
              '"Here Comes the Bride"',
              '"Amazing Grace"',
              '"Jaws" theme'
            ],
            correctAnswer: 0,
            explanation: 'The opening leap of "My Bonnie Lies Over the Ocean" is an ascending major sixth (9 half steps). "NBC chime" (the three-note broadcast jingle) also begins with a major sixth.',
            reference: 'Ear Training Ch. 2'
          },
          {
            id: 'ear-m1-l2-q3',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'An octave contains how many half steps?',
            options: [
              '12 half steps',
              '10 half steps',
              '8 half steps',
              '14 half steps'
            ],
            correctAnswer: 0,
            explanation: 'An octave spans exactly 12 half steps (e.g., C4 to C5). The two notes of an octave share the same letter name and have a frequency ratio of 2:1, making it the most consonant interval after the unison.',
            reference: 'Ear Training Ch. 2'
          },
          {
            id: 'ear-m1-l2-q4',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'A minor seventh interval spans how many half steps?',
            options: [
              '10 half steps',
              '11 half steps',
              '9 half steps',
              '8 half steps'
            ],
            correctAnswer: 0,
            explanation: 'A minor seventh contains 10 half steps (e.g., C to Bb). It is the interval heard in dominant seventh chords and is commonly associated with the opening of "Somewhere" from West Side Story (descending).',
            reference: 'Ear Training Ch. 2'
          },
          {
            id: 'ear-m1-l2-q5',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'Which interval is known for the ominous two-note motif in the "Jaws" movie theme?',
            options: [
              'Minor second',
              'Major second',
              'Minor third',
              'Tritone'
            ],
            correctAnswer: 0,
            explanation: 'The iconic "Jaws" theme by John Williams alternates between two notes a minor second (one half step) apart. The minor second is the smallest interval in Western music and sounds highly dissonant.',
            reference: 'Ear Training Ch. 2'
          }
        ]
      },
      {
        id: 'ear-m1-l3',
        title: 'Ascending vs. Descending Intervals',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m1-l3-q1',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'When identifying intervals, what is the difference between an ascending and descending interval?',
            options: [
              'Ascending moves from a lower pitch to a higher pitch; descending moves from higher to lower',
              'Ascending intervals are always larger than descending intervals',
              'There is no difference; all intervals are measured the same direction',
              'Ascending intervals use sharps and descending intervals use flats'
            ],
            correctAnswer: 0,
            explanation: 'An ascending interval moves upward in pitch (low to high), while a descending interval moves downward (high to low). The size of the interval (number of half steps) remains the same in either direction.',
            reference: 'Ear Training Ch. 3'
          },
          {
            id: 'ear-m1-l3-q2',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'The opening of "Amazing Grace" uses which ascending interval?',
            options: [
              'Perfect fourth',
              'Perfect fifth',
              'Major third',
              'Minor third'
            ],
            correctAnswer: 0,
            explanation: 'The first melodic leap in "Amazing Grace" (on the word "A-ma-") is an ascending perfect fourth. This pickup note to the downbeat creates the characteristic uplifting opening of the hymn.',
            reference: 'Ear Training Ch. 3'
          },
          {
            id: 'ear-m1-l3-q3',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'An interval and its inversion always add up to:',
            options: [
              '9 (e.g., a third inverts to a sixth: 3 + 6 = 9)',
              '8 (one octave)',
              '12 (the number of half steps in an octave)',
              '7 (the number of notes in a scale)'
            ],
            correctAnswer: 0,
            explanation: 'Interval inversions always sum to 9. A second inverts to a seventh (2+7=9), a third inverts to a sixth (3+6=9), a fourth inverts to a fifth (4+5=9), and a unison inverts to an octave (1+8=9).',
            reference: 'Ear Training Ch. 3'
          },
          {
            id: 'ear-m1-l3-q4',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'When a perfect interval is inverted, the resulting interval is:',
            options: [
              'Also perfect (e.g., a perfect fourth inverts to a perfect fifth)',
              'Major',
              'Minor',
              'Augmented'
            ],
            correctAnswer: 0,
            explanation: 'Perfect intervals invert to perfect intervals. A perfect fourth (5 half steps) inverts to a perfect fifth (7 half steps), and vice versa. Major intervals invert to minor, and augmented invert to diminished.',
            reference: 'Ear Training Ch. 3'
          },
          {
            id: 'ear-m1-l3-q5',
            topic: 'Interval Recognition',
            type: 'multiple-choice',
            text: 'Which of the following correctly describes a descending major third?',
            options: [
              'A drop of 4 half steps, as heard at the start of "Hey Jude" (descending "Hey" to "Jude")',
              'A drop of 3 half steps, like a minor third going down',
              'A drop of 5 half steps, equivalent to a perfect fourth',
              'A drop of 2 half steps, which is a whole step'
            ],
            correctAnswer: 0,
            explanation: 'A major third spans 4 half steps in either direction. The beginning of "Hey Jude" by the Beatles features a descending major third. Descending intervals have the same number of half steps as their ascending counterparts.',
            reference: 'Ear Training Ch. 3'
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 2: Chord Quality Recognition
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ear-m2',
    courseId: 'ear-training',
    title: 'Chord Quality Recognition',
    description: 'Distinguish between major, minor, augmented, diminished, and seventh chord types by their construction and character.',
    icon: '🎹',
    order: 1,
    lessons: [
      {
        id: 'ear-m2-l1',
        title: 'Major vs. Minor Triads',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m2-l1-q1',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'A major triad is built from which intervals above the root?',
            options: [
              'Major third + perfect fifth (e.g., C-E-G)',
              'Minor third + perfect fifth (e.g., C-Eb-G)',
              'Major third + augmented fifth (e.g., C-E-G#)',
              'Minor third + diminished fifth (e.g., C-Eb-Gb)'
            ],
            correctAnswer: 0,
            explanation: 'A major triad consists of the root, a major third (4 half steps above the root), and a perfect fifth (7 half steps above the root). For example, C major = C-E-G.',
            reference: 'Ear Training Ch. 4'
          },
          {
            id: 'ear-m2-l1-q2',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'What distinguishes a minor triad from a major triad?',
            options: [
              'The third is lowered by one half step (minor third instead of major third)',
              'The fifth is lowered by one half step',
              'The root is raised by one half step',
              'Both the third and fifth are lowered by one half step'
            ],
            correctAnswer: 0,
            explanation: 'A minor triad has a minor third (3 half steps) instead of a major third (4 half steps) above the root. The fifth remains a perfect fifth. For example, C minor = C-Eb-G, compared to C major = C-E-G.',
            reference: 'Ear Training Ch. 4'
          },
          {
            id: 'ear-m2-l1-q3',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'Major chords are often described as sounding:',
            options: [
              'Bright, happy, or stable',
              'Dark, sad, or melancholic',
              'Tense, dissonant, or unstable',
              'Hollow, open, or ambiguous'
            ],
            correctAnswer: 0,
            explanation: 'Major triads are commonly described as bright, happy, or stable sounding. While these descriptions are somewhat subjective, the major third interval gives the chord its characteristic brightness compared to the darker minor triad.',
            reference: 'Ear Training Ch. 4'
          },
          {
            id: 'ear-m2-l1-q4',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'How many half steps are between the root and the third in a minor triad?',
            options: [
              '3 half steps (a minor third)',
              '4 half steps (a major third)',
              '2 half steps (a major second)',
              '5 half steps (a perfect fourth)'
            ],
            correctAnswer: 0,
            explanation: 'A minor triad has a minor third (3 half steps) between the root and third. This smaller interval is what gives minor chords their characteristically darker, more somber quality compared to major chords.',
            reference: 'Ear Training Ch. 4'
          },
          {
            id: 'ear-m2-l1-q5',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'In a major triad, the interval between the third and the fifth is:',
            options: [
              'A minor third (3 half steps)',
              'A major third (4 half steps)',
              'A perfect fourth (5 half steps)',
              'A major second (2 half steps)'
            ],
            correctAnswer: 0,
            explanation: 'In a major triad (e.g., C-E-G), the interval from the third (E) to the fifth (G) is a minor third (3 half steps). So a major triad is built: major third on the bottom, minor third on top. A minor triad reverses this: minor third on bottom, major third on top.',
            reference: 'Ear Training Ch. 4'
          }
        ]
      },
      {
        id: 'ear-m2-l2',
        title: 'Augmented & Diminished Triads',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m2-l2-q1',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'An augmented triad is constructed by:',
            options: [
              'Stacking two major thirds (root + major third + augmented fifth)',
              'Stacking two minor thirds (root + minor third + diminished fifth)',
              'Stacking a major third and a minor third',
              'Stacking a minor third and a major third'
            ],
            correctAnswer: 0,
            explanation: 'An augmented triad stacks two major thirds: root to third = 4 half steps, third to sharp-five = 4 half steps. For example, C augmented = C-E-G#. This creates a symmetrical, somewhat eerie or suspenseful sound.',
            reference: 'Ear Training Ch. 5'
          },
          {
            id: 'ear-m2-l2-q2',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'A diminished triad is constructed by:',
            options: [
              'Stacking two minor thirds (root + minor third + diminished fifth)',
              'Stacking two major thirds (root + major third + augmented fifth)',
              'Stacking a major third and a minor third',
              'Stacking a perfect fourth and a minor second'
            ],
            correctAnswer: 0,
            explanation: 'A diminished triad stacks two minor thirds: root to third = 3 half steps, third to flat-five = 3 half steps. For example, B diminished = B-D-F. It has a tense, unstable quality that strongly wants to resolve.',
            reference: 'Ear Training Ch. 5'
          },
          {
            id: 'ear-m2-l2-q3',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'The augmented triad is symmetrical, meaning:',
            options: [
              'It divides the octave into three equal parts (major thirds), so any note can function as the root',
              'It uses the same intervals as a major triad but reversed',
              'It sounds the same ascending and descending',
              'It contains equal numbers of sharps and flats'
            ],
            correctAnswer: 0,
            explanation: 'The augmented triad divides the octave into three equal major thirds (4+4+4=12 half steps). This means C augmented (C-E-G#), E augmented (E-G#-C), and G# augmented (G#-C-E) all contain the same pitches.',
            reference: 'Ear Training Ch. 5'
          },
          {
            id: 'ear-m2-l2-q4',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'In a natural minor scale, a diminished triad occurs naturally on which scale degree?',
            options: [
              'The second degree (supertonic)',
              'The first degree (tonic)',
              'The fourth degree (subdominant)',
              'The fifth degree (dominant)'
            ],
            correctAnswer: 0,
            explanation: 'In a natural minor scale, the triad built on the second degree is diminished. For example, in A natural minor, the ii chord is B-D-F (B diminished). In a major scale, the diminished triad occurs on the seventh degree.',
            reference: 'Ear Training Ch. 5'
          },
          {
            id: 'ear-m2-l2-q5',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'Which of the four triad types has the most dissonant, unstable sound?',
            options: [
              'Diminished (two stacked minor thirds create maximum tension)',
              'Augmented (two stacked major thirds sound very bright)',
              'Minor (the lowered third creates sadness)',
              'Major (the strong overtone series clashes)'
            ],
            correctAnswer: 0,
            explanation: 'The diminished triad is generally considered the most dissonant and unstable of the four triad types. It contains a tritone between its root and fifth, which creates strong harmonic tension that demands resolution.',
            reference: 'Ear Training Ch. 5'
          }
        ]
      },
      {
        id: 'ear-m2-l3',
        title: 'Seventh Chord Types',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m2-l3-q1',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'A dominant seventh chord (e.g., G7) is built from:',
            options: [
              'A major triad plus a minor seventh above the root',
              'A major triad plus a major seventh above the root',
              'A minor triad plus a minor seventh above the root',
              'A minor triad plus a major seventh above the root'
            ],
            correctAnswer: 0,
            explanation: 'A dominant seventh chord combines a major triad with a minor seventh (10 half steps from root). For example, G7 = G-B-D-F. It creates tension that naturally resolves to the tonic chord, making it essential to tonal harmony.',
            reference: 'Ear Training Ch. 6'
          },
          {
            id: 'ear-m2-l3-q2',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'A major seventh chord (e.g., Cmaj7) is built from:',
            options: [
              'A major triad plus a major seventh above the root',
              'A major triad plus a minor seventh above the root',
              'A minor triad plus a major seventh above the root',
              'A diminished triad plus a minor seventh above the root'
            ],
            correctAnswer: 0,
            explanation: 'A major seventh chord combines a major triad with a major seventh (11 half steps from root). For example, Cmaj7 = C-E-G-B. It has a lush, jazzy, dreamy quality and does not have the pull toward resolution that a dominant seventh has.',
            reference: 'Ear Training Ch. 6'
          },
          {
            id: 'ear-m2-l3-q3',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'A minor seventh chord (e.g., Am7) is built from:',
            options: [
              'A minor triad plus a minor seventh above the root',
              'A minor triad plus a major seventh above the root',
              'A major triad plus a minor seventh above the root',
              'A diminished triad plus a major seventh above the root'
            ],
            correctAnswer: 0,
            explanation: 'A minor seventh chord combines a minor triad with a minor seventh (10 half steps from root). For example, Am7 = A-C-E-G. It has a warm, mellow sound commonly found in jazz, R&B, and pop music.',
            reference: 'Ear Training Ch. 6'
          },
          {
            id: 'ear-m2-l3-q4',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'A half-diminished seventh chord (e.g., Bm7b5) is built from:',
            options: [
              'A diminished triad plus a minor seventh above the root',
              'A diminished triad plus a major seventh above the root',
              'A minor triad plus a diminished seventh above the root',
              'An augmented triad plus a minor seventh above the root'
            ],
            correctAnswer: 0,
            explanation: 'A half-diminished seventh chord combines a diminished triad with a minor seventh. For example, Bm7b5 = B-D-F-A. It commonly functions as the ii chord in minor keys and is distinct from a fully diminished seventh, which stacks an additional minor third.',
            reference: 'Ear Training Ch. 6'
          },
          {
            id: 'ear-m2-l3-q5',
            topic: 'Chord Quality Recognition',
            type: 'multiple-choice',
            text: 'A fully diminished seventh chord (e.g., Bdim7) is unique because:',
            options: [
              'It is built entirely from stacked minor thirds, dividing the octave into four equal parts',
              'It is the only seventh chord that contains a major seventh interval',
              'It always resolves to a minor chord',
              'It contains two tritones and a perfect fifth'
            ],
            correctAnswer: 0,
            explanation: 'A fully diminished seventh chord stacks four minor thirds (3+3+3+3=12 half steps). This symmetry means there are only three unique diminished seventh chords (each can be respelled with any of its four notes as root). It contains two tritones.',
            reference: 'Ear Training Ch. 6'
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 3: Rhythm & Meter Recognition
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ear-m3',
    courseId: 'ear-training',
    title: 'Rhythm & Meter Recognition',
    description: 'Understand time signatures, rhythmic patterns, and the difference between simple and compound meters.',
    icon: '🥁',
    order: 2,
    lessons: [
      {
        id: 'ear-m3-l1',
        title: 'Time Signatures & Beat Grouping',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m3-l1-q1',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'In a time signature, what does the top number represent?',
            options: [
              'The number of beats (or subdivisions) per measure',
              'The tempo of the piece in BPM',
              'The number of measures in the piece',
              'The note value that gets one beat'
            ],
            correctAnswer: 0,
            explanation: 'The top number of a time signature indicates how many beats (or beat subdivisions, in compound meter) are in each measure. For example, in 4/4, there are four beats per measure.',
            reference: 'Ear Training Ch. 7'
          },
          {
            id: 'ear-m3-l1-q2',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'In the time signature 3/4, the bottom number "4" means:',
            options: [
              'The quarter note receives one beat',
              'There are four beats per measure',
              'The piece is in four-four time',
              'The tempo is four beats per second'
            ],
            correctAnswer: 0,
            explanation: 'The bottom number indicates which note value gets one beat. "4" means the quarter note gets one beat, "8" means the eighth note gets one beat, "2" means the half note gets one beat, and "1" means the whole note gets one beat.',
            reference: 'Ear Training Ch. 7'
          },
          {
            id: 'ear-m3-l1-q3',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: '4/4 time is also known as:',
            options: [
              'Common time, indicated by a "C" symbol on the staff',
              'Cut time, indicated by a "C" with a vertical line',
              'March time, because all marches use it',
              'Standard time, used exclusively in classical music'
            ],
            correctAnswer: 0,
            explanation: '4/4 is called "common time" because it is the most frequently used time signature in Western music. It is often represented by a C-like symbol on the staff. Cut time (2/2) uses a C with a vertical line through it.',
            reference: 'Ear Training Ch. 7'
          },
          {
            id: 'ear-m3-l1-q4',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'A waltz is most commonly written in which time signature?',
            options: [
              '3/4 (three quarter-note beats per measure)',
              '4/4 (four quarter-note beats per measure)',
              '6/8 (six eighth-note beats per measure)',
              '2/4 (two quarter-note beats per measure)'
            ],
            correctAnswer: 0,
            explanation: 'The waltz is characterized by its 3/4 time signature, with a strong emphasis on beat one followed by two lighter beats (ONE-two-three). This triple meter gives the waltz its distinctive swaying, dance-like feel.',
            reference: 'Ear Training Ch. 7'
          },
          {
            id: 'ear-m3-l1-q5',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'How many eighth notes fit in one measure of 4/4 time?',
            options: [
              '8 eighth notes',
              '4 eighth notes',
              '16 eighth notes',
              '6 eighth notes'
            ],
            correctAnswer: 0,
            explanation: 'In 4/4 time, there are 4 quarter-note beats per measure. Since each quarter note equals two eighth notes, a full measure contains 8 eighth notes (4 beats x 2 eighth notes per beat = 8).',
            reference: 'Ear Training Ch. 7'
          }
        ]
      },
      {
        id: 'ear-m3-l2',
        title: 'Simple vs. Compound Meter',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m3-l2-q1',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'What defines a "simple" meter?',
            options: [
              'Each beat divides naturally into two equal parts',
              'Each beat divides naturally into three equal parts',
              'The time signature has a small top number',
              'The music has no syncopation'
            ],
            correctAnswer: 0,
            explanation: 'In simple meter, each beat divides into two equal subdivisions. For example, in 4/4 (simple quadruple), each quarter-note beat divides into two eighth notes. Common simple meters include 2/4, 3/4, and 4/4.',
            reference: 'Ear Training Ch. 8'
          },
          {
            id: 'ear-m3-l2-q2',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'What defines a "compound" meter?',
            options: [
              'Each beat divides naturally into three equal parts',
              'Each beat divides naturally into two equal parts',
              'The music uses multiple time signatures',
              'The tempo changes throughout the piece'
            ],
            correctAnswer: 0,
            explanation: 'In compound meter, each beat divides into three equal subdivisions. The most common example is 6/8, which has two dotted-quarter-note beats, each subdividing into three eighth notes. This gives compound meter its characteristic lilting feel.',
            reference: 'Ear Training Ch. 8'
          },
          {
            id: 'ear-m3-l2-q3',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: '6/8 time is classified as compound duple because:',
            options: [
              'It has two main beats per measure, each subdivided into three eighth notes',
              'It has six main beats per measure, making it sextuple',
              'It alternates between two different tempos',
              'It has three main beats, each subdivided into two eighth notes'
            ],
            correctAnswer: 0,
            explanation: '6/8 is compound duple: "compound" because beats subdivide into three, "duple" because there are two main beats per measure. The six eighth notes group as 3+3, with strong beats on eighth notes 1 and 4.',
            reference: 'Ear Training Ch. 8'
          },
          {
            id: 'ear-m3-l2-q4',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'Which of the following is a compound triple meter?',
            options: [
              '9/8 (three groups of three eighth notes)',
              '3/4 (three quarter-note beats)',
              '6/8 (two groups of three eighth notes)',
              '12/8 (four groups of three eighth notes)'
            ],
            correctAnswer: 0,
            explanation: '9/8 is compound triple meter: three dotted-quarter-note beats per measure, each subdividing into three eighth notes (3+3+3=9). By contrast, 3/4 is simple triple, 6/8 is compound duple, and 12/8 is compound quadruple.',
            reference: 'Ear Training Ch. 8'
          },
          {
            id: 'ear-m3-l2-q5',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'A quick way to determine if a time signature is compound is:',
            options: [
              'The top number is divisible by 3 (and greater than 3), such as 6, 9, or 12',
              'The bottom number is always 8',
              'The top number is an odd number',
              'The time signature uses a C symbol'
            ],
            correctAnswer: 0,
            explanation: 'If the top number is 6, 9, or 12 (divisible by 3 and greater than 3), the meter is compound. Divide the top number by 3 to get the number of beats: 6/3=2 beats (duple), 9/3=3 beats (triple), 12/3=4 beats (quadruple).',
            reference: 'Ear Training Ch. 8'
          }
        ]
      },
      {
        id: 'ear-m3-l3',
        title: 'Syncopation & Rhythmic Patterns',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m3-l3-q1',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'Syncopation is best described as:',
            options: [
              'Emphasis on normally weak beats or off-beats, creating rhythmic surprise',
              'Playing all notes at the same volume',
              'Gradually slowing down the tempo',
              'Dividing beats into smaller subdivisions'
            ],
            correctAnswer: 0,
            explanation: 'Syncopation occurs when rhythmic stress is placed on beats or subdivisions that are normally weak or unaccented. It creates a sense of rhythmic tension and forward motion, and is fundamental to jazz, funk, Latin, and much popular music.',
            reference: 'Ear Training Ch. 9'
          },
          {
            id: 'ear-m3-l3-q2',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'A dotted note increases the original note value by:',
            options: [
              'Half of its original value (e.g., a dotted quarter note = 1.5 beats in simple time)',
              'Double its original value',
              'One beat regardless of the note type',
              'One quarter of its original value'
            ],
            correctAnswer: 0,
            explanation: 'A dot adds half the value of the note it follows. A dotted quarter note = 1 beat + 0.5 beat = 1.5 beats. A dotted half note = 2 + 1 = 3 beats. A dotted eighth note = 0.5 + 0.25 = 0.75 beats.',
            reference: 'Ear Training Ch. 9'
          },
          {
            id: 'ear-m3-l3-q3',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'A triplet divides a beat into:',
            options: [
              'Three equal parts where two would normally occur',
              'Two equal parts where three would normally occur',
              'Four equal parts in the space of one beat',
              'Three unequal parts within one measure'
            ],
            correctAnswer: 0,
            explanation: 'A triplet places three notes in the time normally occupied by two notes of the same value. For example, an eighth-note triplet fits three eighth notes into the space of one quarter-note beat (where two eighth notes would normally go).',
            reference: 'Ear Training Ch. 9'
          },
          {
            id: 'ear-m3-l3-q4',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'What is a "hemiola"?',
            options: [
              'A rhythmic device where two groups of three are regrouped as three groups of two (or vice versa)',
              'A type of whole rest that lasts for two measures',
              'A tempo marking indicating half speed',
              'A syncopated pattern unique to jazz music'
            ],
            correctAnswer: 0,
            explanation: 'A hemiola creates the momentary illusion of a meter change by regrouping beats. In 3/4 time, for example, two measures of three beats (123-123) might be articulated as three groups of two (12-12-12), creating a brief sense of duple meter.',
            reference: 'Ear Training Ch. 9'
          },
          {
            id: 'ear-m3-l3-q5',
            topic: 'Rhythm & Meter Recognition',
            type: 'multiple-choice',
            text: 'In 4/4 time, which beats are normally the strongest?',
            options: [
              'Beat 1 (strongest) and beat 3 (secondary strong beat)',
              'Beat 2 and beat 4 (the backbeats)',
              'All four beats are equally strong',
              'Beat 4 only, as it leads into the next measure'
            ],
            correctAnswer: 0,
            explanation: 'In 4/4 time, beat 1 carries the strongest accent (downbeat) and beat 3 has a secondary accent. Beats 2 and 4 are normally weaker. However, in genres like rock and pop, the backbeat (beats 2 and 4) is often emphasized by the snare drum.',
            reference: 'Ear Training Ch. 9'
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 4: Melody & Pitch
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ear-m4',
    courseId: 'ear-training',
    title: 'Melody & Pitch',
    description: 'Explore scale degrees, relative pitch, transposition, and melodic contour in musical contexts.',
    icon: '🎶',
    order: 3,
    lessons: [
      {
        id: 'ear-m4-l1',
        title: 'Scale Degrees & Solfege',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m4-l1-q1',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'In solfege, the seven syllables of the major scale in ascending order are:',
            options: [
              'Do, Re, Mi, Fa, Sol, La, Ti',
              'Do, Re, Mi, Fa, So, La, Si',
              'Da, Re, Mi, Fa, Sol, La, Ti',
              'Do, Ri, Me, Fa, Sol, La, Te'
            ],
            correctAnswer: 0,
            explanation: 'The standard solfege syllables for the major scale are Do-Re-Mi-Fa-Sol-La-Ti (returning to Do at the octave). This system was developed by Guido of Arezzo in the 11th century and remains the foundation of sight-singing pedagogy.',
            reference: 'Ear Training Ch. 10'
          },
          {
            id: 'ear-m4-l1-q2',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'The "leading tone" of a major scale (Ti / scale degree 7) has a strong tendency to resolve to:',
            options: [
              'The tonic (Do / scale degree 1), a half step above',
              'The dominant (Sol / scale degree 5)',
              'The subdominant (Fa / scale degree 4)',
              'The supertonic (Re / scale degree 2)'
            ],
            correctAnswer: 0,
            explanation: 'The leading tone (Ti, the 7th scale degree) is only a half step below the tonic (Do). This close proximity creates a strong pull toward resolution to the tonic, which is why it is called the "leading" tone -- it leads the ear to Do.',
            reference: 'Ear Training Ch. 10'
          },
          {
            id: 'ear-m4-l1-q3',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'What is the difference between "fixed Do" and "movable Do" solfege?',
            options: [
              'In movable Do, "Do" is always the tonic of the current key; in fixed Do, "Do" is always C regardless of key',
              'Fixed Do is used for singing and movable Do is used for instruments',
              'Movable Do only applies to minor keys',
              'There is no practical difference; they are two names for the same system'
            ],
            correctAnswer: 0,
            explanation: 'In movable Do (common in the U.S. and U.K.), Do shifts to match the tonic of whatever key you are in. In fixed Do (common in France and Italy), Do always corresponds to the note C. Movable Do emphasizes scale-degree function; fixed Do emphasizes absolute pitch.',
            reference: 'Ear Training Ch. 10'
          },
          {
            id: 'ear-m4-l1-q4',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'The dominant scale degree (Sol, degree 5) is significant because:',
            options: [
              'It is the second most stable tone in the key and forms the basis of the V chord, which creates tension that resolves to the tonic',
              'It is the least stable tone and always resolves downward',
              'It only appears in minor scales',
              'It is always the highest note in a melody'
            ],
            correctAnswer: 0,
            explanation: 'The dominant (5th degree) is the second pillar of tonal music after the tonic. The V chord (built on the dominant) creates the strongest pull back to the I chord (tonic). The tonic-dominant relationship is the foundation of Western harmony.',
            reference: 'Ear Training Ch. 10'
          },
          {
            id: 'ear-m4-l1-q5',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'In the natural minor scale, which solfege syllable replaces Ti (the major scale\'s 7th degree)?',
            options: [
              'Te (a lowered 7th, a whole step below Do)',
              'Ti remains the same in minor',
              'Si (a raised 7th unique to minor)',
              'Le (the lowered 6th degree)'
            ],
            correctAnswer: 0,
            explanation: 'In the natural minor scale (movable Do system), the 7th degree is lowered by a half step, changing Ti to Te (pronounced "tay"). This whole step between Te and Do removes the strong leading-tone pull found in major keys.',
            reference: 'Ear Training Ch. 10'
          }
        ]
      },
      {
        id: 'ear-m4-l2',
        title: 'Relative Pitch & Transposition',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m4-l2-q1',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'Relative pitch refers to:',
            options: [
              'The ability to identify or produce a note by comparing it to a known reference pitch',
              'The ability to name any pitch without any reference, also known as perfect pitch',
              'The relationship between the pitch of two different instruments',
              'The pitch of a note relative to the speed of sound'
            ],
            correctAnswer: 0,
            explanation: 'Relative pitch is the ability to identify intervals and notes by their relationship to a reference pitch. Unlike perfect (absolute) pitch, which is largely innate, relative pitch can be developed through ear training and is the skill most musicians rely on.',
            reference: 'Ear Training Ch. 11'
          },
          {
            id: 'ear-m4-l2-q2',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'Transposing a melody means:',
            options: [
              'Moving every note up or down by the same interval, preserving the melody in a new key',
              'Playing the melody backward (retrograde)',
              'Changing the rhythm while keeping the same pitches',
              'Adding harmony notes below the melody'
            ],
            correctAnswer: 0,
            explanation: 'Transposition shifts every note of a melody by the same interval, effectively moving the music to a different key while preserving all the intervallic relationships. The melody sounds the "same" but higher or lower.',
            reference: 'Ear Training Ch. 11'
          },
          {
            id: 'ear-m4-l2-q3',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'If a melody in C major is transposed up a perfect fifth, the new key is:',
            options: [
              'G major',
              'F major',
              'D major',
              'A major'
            ],
            correctAnswer: 0,
            explanation: 'Transposing C major up a perfect fifth moves the tonic from C to G, resulting in G major (one sharp: F#). Each note of the melody shifts up by a perfect fifth, maintaining the same intervals and melodic shape.',
            reference: 'Ear Training Ch. 11'
          },
          {
            id: 'ear-m4-l2-q4',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'A Bb trumpet is a "transposing instrument," meaning:',
            options: [
              'When the player reads and plays a C, the instrument sounds Bb (a major second lower than written)',
              'The instrument can only play in the key of Bb',
              'The player must always transpose sheet music before playing',
              'The instrument has a built-in transposition pedal'
            ],
            correctAnswer: 0,
            explanation: 'A Bb transposing instrument sounds a major second lower than written. When the player reads C, the audience hears Bb. Music for Bb instruments is written a major second higher than concert pitch so the sounding result matches the intended pitches.',
            reference: 'Ear Training Ch. 11'
          },
          {
            id: 'ear-m4-l2-q5',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'Perfect pitch (absolute pitch) differs from relative pitch in that:',
            options: [
              'A person with perfect pitch can identify or produce any pitch without an external reference',
              'Perfect pitch is more accurate for identifying intervals than relative pitch',
              'Relative pitch is innate while perfect pitch must be learned',
              'Perfect pitch only applies to singers, not instrumentalists'
            ],
            correctAnswer: 0,
            explanation: 'Perfect (absolute) pitch is the rare ability to identify or produce a specific pitch (e.g., "that is an A440") without any reference tone. It is largely innate and estimated to occur in about 1 in 10,000 people. Relative pitch, by contrast, can be trained.',
            reference: 'Ear Training Ch. 11'
          }
        ]
      },
      {
        id: 'ear-m4-l3',
        title: 'Melodic Contour & Analysis',
        xpReward: 10,
        questions: [
          {
            id: 'ear-m4-l3-q1',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'Melodic contour refers to:',
            options: [
              'The overall shape of a melody -- whether it moves up, down, stays level, or curves in an arc',
              'The number of notes in a melody',
              'The dynamic range of a melody (loud vs. soft)',
              'The key signature in which a melody is written'
            ],
            correctAnswer: 0,
            explanation: 'Melodic contour is the shape or profile of a melody as it rises and falls. Common contour types include ascending, descending, arch (rising then falling), inverted arch (falling then rising), and stationary. Contour is one of the first things listeners perceive.',
            reference: 'Ear Training Ch. 12'
          },
          {
            id: 'ear-m4-l3-q2',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'Conjunct (stepwise) melodic motion means:',
            options: [
              'The melody moves mostly by seconds (steps), with each note adjacent to the next in the scale',
              'The melody uses only large leaps of a fourth or greater',
              'The melody stays on one repeated pitch',
              'Two melodies move in the same direction simultaneously'
            ],
            correctAnswer: 0,
            explanation: 'Conjunct motion is stepwise movement where notes are close together (seconds). It creates smooth, singable melodies. Examples include scales and many folk tunes. The opposite, disjunct motion, uses larger intervals (leaps).',
            reference: 'Ear Training Ch. 12'
          },
          {
            id: 'ear-m4-l3-q3',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'Disjunct (leaping) melodic motion is characterized by:',
            options: [
              'Intervals larger than a second (thirds, fourths, fifths, or larger)',
              'Movement by half steps only',
              'Repeated notes on the same pitch',
              'Descending scales played quickly'
            ],
            correctAnswer: 0,
            explanation: 'Disjunct motion uses intervals larger than a second, creating angular, dramatic melodies. The opening of "The Star-Spangled Banner" is highly disjunct with large leaps. Disjunct melodies tend to be more challenging to sing than conjunct ones.',
            reference: 'Ear Training Ch. 12'
          },
          {
            id: 'ear-m4-l3-q4',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'A melodic sequence is:',
            options: [
              'A melodic pattern repeated at a higher or lower pitch level',
              'A melody played in reverse order',
              'A series of chords that repeat in a loop',
              'The order of sharps or flats in a key signature'
            ],
            correctAnswer: 0,
            explanation: 'A melodic sequence takes a short melodic pattern (a motive) and repeats it starting on a different pitch, maintaining the same interval relationships. Sequences create a sense of direction and momentum, and are used extensively in Baroque and classical music.',
            reference: 'Ear Training Ch. 12'
          },
          {
            id: 'ear-m4-l3-q5',
            topic: 'Melody & Pitch',
            type: 'multiple-choice',
            text: 'An "arch" melodic contour describes a melody that:',
            options: [
              'Rises to a high point (climax) and then descends back down',
              'Descends to a low point and then rises back up',
              'Stays on the same pitch throughout',
              'Alternates rapidly between two pitches'
            ],
            correctAnswer: 0,
            explanation: 'An arch contour rises to a peak and then falls, creating a natural sense of tension and release. Many well-known melodies follow this shape, including "Over the Rainbow." The high point of the arch is often the emotional climax of the phrase.',
            reference: 'Ear Training Ch. 12'
          }
        ]
      }
    ]
  }
]
