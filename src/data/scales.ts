import type { Module } from '../types'

export const scaleModules: Module[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // MODULE 1 — Major Scales
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'scales-m1',
    courseId: 'scales',
    title: 'Major Scales',
    description: 'Learn the whole/half step pattern, all 12 major scales, scale degrees, and solfege syllables.',
    icon: '\uD83C\uDFB5',
    order: 0,
    lessons: [
      {
        id: 'scales-m1-l1',
        title: 'The Major Scale Pattern',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m1-l1-q1',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'What is the interval pattern (in whole and half steps) for a major scale?',
            options: [
              'W-W-H-W-W-W-H',
              'W-H-W-W-H-W-W',
              'W-W-W-H-W-W-H',
              'H-W-W-W-H-W-W'
            ],
            correctAnswer: 0,
            explanation: 'The major scale follows the pattern Whole-Whole-Half-Whole-Whole-Whole-Half. This pattern produces the familiar Do-Re-Mi sound and applies to every major scale regardless of starting note.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l1-q2',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'In the C major scale, where do the half steps occur?',
            options: [
              'Between E-F and B-C',
              'Between D-E and A-B',
              'Between C-D and G-A',
              'Between F-G and C-D'
            ],
            correctAnswer: 0,
            explanation: 'In C major (C-D-E-F-G-A-B-C), the naturally occurring half steps on the piano are between E and F (scale degrees 3-4) and between B and C (scale degrees 7-1). These correspond to the two half steps in the W-W-H-W-W-W-H pattern.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l1-q3',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'How many half steps are in a whole step?',
            options: [
              'Two',
              'One',
              'Three',
              'One and a half'
            ],
            correctAnswer: 0,
            explanation: 'A whole step equals two half steps. On a piano, a half step is the distance between any two adjacent keys (including black keys). A whole step skips one key in between.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l1-q4',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'Which of the following is the correct G major scale?',
            options: [
              'G-A-B-C-D-E-F#-G',
              'G-A-B-C-D-E-F-G',
              'G-A-Bb-C-D-Eb-F-G',
              'G-A-B-C#-D-E-F#-G'
            ],
            correctAnswer: 0,
            explanation: 'Applying W-W-H-W-W-W-H from G: G-(W)-A-(W)-B-(H)-C-(W)-D-(W)-E-(W)-F#-(H)-G. The F must be raised to F# to maintain the correct whole step between E and F# and the half step between F# and G.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l1-q5',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'How many sharps are in the key of D major?',
            options: [
              'Two (F# and C#)',
              'One (F#)',
              'Three (F#, C#, and G#)',
              'No sharps'
            ],
            correctAnswer: 0,
            explanation: 'D major: D-E-F#-G-A-B-C#-D. Applying the W-W-H-W-W-W-H pattern from D requires raising F to F# and C to C#, giving two sharps.',
            reference: 'Scales & Modes Ch. 1'
          }
        ]
      },
      {
        id: 'scales-m1-l2',
        title: 'Scale Degrees & Solfege',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m1-l2-q1',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'What is the name of the 5th degree of a major scale?',
            options: [
              'Dominant',
              'Mediant',
              'Subdominant',
              'Supertonic'
            ],
            correctAnswer: 0,
            explanation: 'The scale degrees are: 1-Tonic, 2-Supertonic, 3-Mediant, 4-Subdominant, 5-Dominant, 6-Submediant, 7-Leading Tone. The dominant (5th degree) is one of the most important tones harmonically.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l2-q2',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'In solfege, what syllable corresponds to the 4th scale degree?',
            options: [
              'Fa',
              'Mi',
              'Sol',
              'Re'
            ],
            correctAnswer: 0,
            explanation: 'The solfege syllables for the major scale are: Do(1)-Re(2)-Mi(3)-Fa(4)-Sol(5)-La(6)-Ti(7)-Do(8). Fa corresponds to the 4th degree (subdominant).',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l2-q3',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'The 7th degree of a major scale is called the "leading tone" because:',
            options: [
              'It is a half step below the tonic and has a strong tendency to resolve upward to it',
              'It leads the melody downward to the 6th degree',
              'It is the loudest note in the scale',
              'It always begins a musical phrase'
            ],
            correctAnswer: 0,
            explanation: 'The leading tone is only a half step below the tonic (the octave). This closeness creates a strong pull or tendency to resolve upward to the tonic, which is why it is called the "leading" tone.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l2-q4',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'How many flats are in the key of Bb major?',
            options: [
              'Two (Bb and Eb)',
              'One (Bb)',
              'Three (Bb, Eb, and Ab)',
              'Four (Bb, Eb, Ab, and Db)'
            ],
            correctAnswer: 0,
            explanation: 'Bb major: Bb-C-D-Eb-F-G-A-Bb. Applying the W-W-H-W-W-W-H pattern from Bb requires Bb and Eb, giving two flats.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l2-q5',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'What is the "mediant" scale degree?',
            options: [
              'The 3rd degree, located midway between the tonic and dominant',
              'The 6th degree, located midway between the dominant and octave',
              'The 2nd degree, right above the tonic',
              'The 4th degree, one step below the dominant'
            ],
            correctAnswer: 0,
            explanation: 'The mediant is the 3rd scale degree. It gets its name because it is the middle note between the tonic (1st) and the dominant (5th). The mediant determines whether a key sounds major or minor.',
            reference: 'Scales & Modes Ch. 1'
          }
        ]
      },
      {
        id: 'scales-m1-l3',
        title: 'Key Signatures & the Circle of Fifths',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m1-l3-q1',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'In the circle of fifths, moving clockwise from C, what is the order of sharp keys?',
            options: [
              'G, D, A, E, B, F#, C#',
              'F, Bb, Eb, Ab, Db, Gb, Cb',
              'D, E, F#, G#, A#, B#, C#',
              'G, A, B, C#, D#, E#, F#'
            ],
            correctAnswer: 0,
            explanation: 'Moving clockwise (up a perfect 5th each time): C(0 sharps), G(1), D(2), A(3), E(4), B(5), F#(6), C#(7). Each key adds one more sharp.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l3-q2',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'What is the order in which sharps are added to key signatures?',
            options: [
              'F#, C#, G#, D#, A#, E#, B#',
              'C#, F#, G#, D#, A#, E#, B#',
              'B#, E#, A#, D#, G#, C#, F#',
              'F#, G#, A#, B#, C#, D#, E#'
            ],
            correctAnswer: 0,
            explanation: 'Sharps are added in the order F-C-G-D-A-E-B (remembered by "Father Charles Goes Down And Ends Battle"). Each new sharp key adds the next sharp in this sequence.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l3-q3',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'How many flats does the key of Ab major have?',
            options: [
              'Four (Bb, Eb, Ab, Db)',
              'Three (Bb, Eb, Ab)',
              'Five (Bb, Eb, Ab, Db, Gb)',
              'Two (Ab, Db)'
            ],
            correctAnswer: 0,
            explanation: 'Ab major has four flats: Bb, Eb, Ab, and Db. The flat keys on the circle of fifths (moving counterclockwise from C) are F(1), Bb(2), Eb(3), Ab(4), Db(5), Gb(6), Cb(7).',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l3-q4',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'Which major key is enharmonically equivalent to Gb major?',
            options: [
              'F# major',
              'G major',
              'Ab major',
              'E major'
            ],
            correctAnswer: 0,
            explanation: 'Gb major (6 flats) and F# major (6 sharps) are enharmonic equivalents: they sound identical but are spelled differently. Gb major uses flats while F# major uses sharps.',
            reference: 'Scales & Modes Ch. 1'
          },
          {
            id: 'scales-m1-l3-q5',
            topic: 'Major Scales',
            type: 'multiple-choice',
            text: 'What is the order in which flats are added to key signatures?',
            options: [
              'Bb, Eb, Ab, Db, Gb, Cb, Fb',
              'Fb, Cb, Gb, Db, Ab, Eb, Bb',
              'Bb, Db, Gb, Ab, Eb, Cb, Fb',
              'Eb, Bb, Ab, Db, Gb, Cb, Fb'
            ],
            correctAnswer: 0,
            explanation: 'Flats are added in the order B-E-A-D-G-C-F (remembered by "Battle Ends And Down Goes Charles\' Father" -- the reverse of the sharp order). Each new flat key adds the next flat in this sequence.',
            reference: 'Scales & Modes Ch. 1'
          }
        ]
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // MODULE 2 — Minor Scales
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'scales-m2',
    courseId: 'scales',
    title: 'Minor Scales',
    description: 'Explore natural minor, harmonic minor, melodic minor, and relative minor relationships.',
    icon: '\uD83C\uDFB6',
    order: 1,
    lessons: [
      {
        id: 'scales-m2-l1',
        title: 'Natural Minor Scale',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m2-l1-q1',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'What is the interval pattern for a natural minor scale?',
            options: [
              'W-H-W-W-H-W-W',
              'W-W-H-W-W-W-H',
              'W-H-W-W-W-H-W',
              'H-W-W-H-W-W-W'
            ],
            correctAnswer: 0,
            explanation: 'The natural minor scale follows the pattern Whole-Half-Whole-Whole-Half-Whole-Whole. This is equivalent to starting a major scale from its 6th degree (the Aeolian mode).',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l1-q2',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'What is the relative minor of C major?',
            options: [
              'A minor',
              'C minor',
              'E minor',
              'D minor'
            ],
            correctAnswer: 0,
            explanation: 'The relative minor is found a minor 3rd (3 half steps) below the major key tonic, or equivalently on the 6th degree. The 6th degree of C major is A, so A minor is the relative minor of C major. They share the same key signature (no sharps or flats).',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l1-q3',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'Which notes make up the A natural minor scale?',
            options: [
              'A-B-C-D-E-F-G-A',
              'A-B-C#-D-E-F-G#-A',
              'A-B-C-D-E-F#-G#-A',
              'A-Bb-C-D-Eb-F-G-A'
            ],
            correctAnswer: 0,
            explanation: 'A natural minor uses all white keys on the piano: A-B-C-D-E-F-G-A. It shares the same notes as C major (its relative major) but starts and ends on A, giving it a minor quality.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l1-q4',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'What is the relative minor of G major?',
            options: [
              'E minor',
              'B minor',
              'D minor',
              'A minor'
            ],
            correctAnswer: 0,
            explanation: 'The relative minor starts on the 6th degree of the major scale. The 6th degree of G major (G-A-B-C-D-E-F#-G) is E. E minor and G major share the same key signature of one sharp (F#).',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l1-q5',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'The interval between the 7th degree and the tonic in a natural minor scale is:',
            options: [
              'A whole step',
              'A half step',
              'A minor third',
              'An augmented second'
            ],
            correctAnswer: 0,
            explanation: 'In the natural minor scale, the 7th degree is a whole step below the tonic. This is called the "subtonic" (not "leading tone"). Because it lacks the half-step pull to the tonic, the natural minor has a weaker sense of resolution compared to harmonic minor.',
            reference: 'Scales & Modes Ch. 2'
          }
        ]
      },
      {
        id: 'scales-m2-l2',
        title: 'Harmonic Minor Scale',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m2-l2-q1',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'How does the harmonic minor scale differ from the natural minor scale?',
            options: [
              'The 7th degree is raised by a half step',
              'The 6th degree is raised by a half step',
              'The 3rd degree is raised by a half step',
              'Both the 6th and 7th degrees are raised by a half step'
            ],
            correctAnswer: 0,
            explanation: 'The harmonic minor raises the 7th degree by one half step compared to the natural minor. This creates a leading tone (half step below the tonic), which provides a stronger pull toward resolution and allows for a major V chord.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l2-q2',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'What is the interval pattern for the harmonic minor scale?',
            options: [
              'W-H-W-W-H-A2-H (where A2 = augmented second, 3 half steps)',
              'W-H-W-W-W-H-H',
              'W-H-W-W-H-W-H',
              'W-W-H-W-H-A2-H'
            ],
            correctAnswer: 0,
            explanation: 'The harmonic minor pattern is W-H-W-W-H-augmented 2nd-H. The augmented 2nd (equivalent to 3 half steps) between the 6th and raised 7th degrees gives the harmonic minor its distinctive exotic sound.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l2-q3',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'Which notes make up the A harmonic minor scale?',
            options: [
              'A-B-C-D-E-F-G#-A',
              'A-B-C-D-E-F#-G#-A',
              'A-B-C-D-E-F-G-A',
              'A-B-C#-D-E-F-G#-A'
            ],
            correctAnswer: 0,
            explanation: 'A harmonic minor is A natural minor with a raised 7th: A-B-C-D-E-F-G#-A. The G is raised to G# to create a leading tone, while F remains natural, producing the characteristic augmented 2nd interval between F and G#.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l2-q4',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'Why was the harmonic minor scale developed?',
            options: [
              'To create a leading tone that allows a major V chord to resolve to the tonic minor chord',
              'To add more sharps to minor key signatures',
              'To make the minor scale sound identical to the major scale',
              'To eliminate the augmented second interval'
            ],
            correctAnswer: 0,
            explanation: 'The natural minor scale produces a minor v chord (e.g., Em in A minor). By raising the 7th degree, the harmonic minor creates a major V chord (e.g., E major in A minor) with a leading tone, providing a much stronger dominant-to-tonic resolution.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l2-q5',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'The characteristic interval of the harmonic minor scale (the augmented 2nd) occurs between which scale degrees?',
            options: [
              '6th and 7th degrees',
              '2nd and 3rd degrees',
              '4th and 5th degrees',
              '7th degree and tonic'
            ],
            correctAnswer: 0,
            explanation: 'The augmented 2nd (three half steps) occurs between the 6th and raised 7th degrees. For example, in A harmonic minor, the augmented 2nd is between F (natural 6th) and G# (raised 7th). This distinctive interval gives the harmonic minor its characteristic sound.',
            reference: 'Scales & Modes Ch. 2'
          }
        ]
      },
      {
        id: 'scales-m2-l3',
        title: 'Melodic Minor Scale',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m2-l3-q1',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'How does the traditional (classical) melodic minor scale differ ascending vs. descending?',
            options: [
              'Ascending: raise both 6th and 7th degrees; descending: revert to natural minor',
              'Ascending: raise only the 7th degree; descending: raise only the 6th',
              'It is the same ascending and descending',
              'Ascending: natural minor; descending: raise the 6th and 7th'
            ],
            correctAnswer: 0,
            explanation: 'In the classical melodic minor, the 6th and 7th degrees are raised when ascending (to eliminate the augmented 2nd and provide a leading tone). When descending, both revert to their natural minor positions, since the leading tone pull is unnecessary going down.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l3-q2',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'What are the notes of A melodic minor ascending?',
            options: [
              'A-B-C-D-E-F#-G#-A',
              'A-B-C-D-E-F-G#-A',
              'A-B-C#-D-E-F#-G#-A',
              'A-B-C-D-E-F#-G-A'
            ],
            correctAnswer: 0,
            explanation: 'A melodic minor ascending raises both the 6th (F to F#) and 7th (G to G#): A-B-C-D-E-F#-G#-A. This eliminates the augmented 2nd between F and G# that exists in harmonic minor, making the scale smoother for melodies.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l3-q3',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'In jazz theory, the melodic minor scale is typically used:',
            options: [
              'With the raised 6th and 7th in both directions (ascending form only)',
              'Only in the descending form',
              'Identically to the natural minor in all contexts',
              'With a raised 3rd degree as well'
            ],
            correctAnswer: 0,
            explanation: 'In jazz, the melodic minor is treated as a single scale with the raised 6th and 7th in both directions (the ascending form). It is sometimes called the "jazz minor" scale and serves as the basis for several important jazz modes and chord-scale relationships.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l3-q4',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'The ascending melodic minor scale has the same upper four notes (degrees 5-6-7-8) as which major scale?',
            options: [
              'The major scale built on the same tonic',
              'The major scale built on the 3rd degree',
              'The major scale built on the 5th degree',
              'The major scale built on the 4th degree'
            ],
            correctAnswer: 0,
            explanation: 'The ascending melodic minor differs from the parallel major scale only in the 3rd degree (which is lowered). Degrees 5-6-7-8 are identical. For example, A melodic minor ascending (A-B-C-D-E-F#-G#-A) matches A major (A-B-C#-D-E-F#-G#-A) except for the C vs C#.',
            reference: 'Scales & Modes Ch. 2'
          },
          {
            id: 'scales-m2-l3-q5',
            topic: 'Minor Scales',
            type: 'multiple-choice',
            text: 'What problem does raising the 6th degree in melodic minor solve compared to harmonic minor?',
            options: [
              'It eliminates the augmented 2nd interval between the 6th and 7th degrees',
              'It adds a second leading tone',
              'It creates a whole tone scale pattern',
              'It allows the scale to be used in major keys'
            ],
            correctAnswer: 0,
            explanation: 'Harmonic minor has an augmented 2nd (3 half steps) between the natural 6th and raised 7th, which can sound awkward in melodic passages. Raising the 6th degree in melodic minor turns this into a whole step, creating a smoother stepwise motion.',
            reference: 'Scales & Modes Ch. 2'
          }
        ]
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // MODULE 3 — Church Modes
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'scales-m3',
    courseId: 'scales',
    title: 'Church Modes',
    description: 'Master the seven church modes: Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, and Locrian.',
    icon: '\u26EA',
    order: 2,
    lessons: [
      {
        id: 'scales-m3-l1',
        title: 'Dorian & Phrygian Modes',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m3-l1-q1',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'The Dorian mode is built starting on which degree of the major scale?',
            options: [
              '2nd degree',
              '3rd degree',
              '4th degree',
              '5th degree'
            ],
            correctAnswer: 0,
            explanation: 'Dorian is the mode that begins on the 2nd degree of a major scale. For example, D Dorian uses the notes of C major starting from D: D-E-F-G-A-B-C-D. The modes in order of major scale degrees are: 1-Ionian, 2-Dorian, 3-Phrygian, 4-Lydian, 5-Mixolydian, 6-Aeolian, 7-Locrian.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l1-q2',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'How does Dorian differ from the natural minor (Aeolian) scale?',
            options: [
              'Dorian has a raised 6th degree compared to natural minor',
              'Dorian has a raised 7th degree compared to natural minor',
              'Dorian has a lowered 2nd degree compared to natural minor',
              'Dorian is identical to natural minor'
            ],
            correctAnswer: 0,
            explanation: 'Dorian is like natural minor but with a raised 6th degree. For example, D Dorian (D-E-F-G-A-B-C-D) vs D natural minor (D-E-F-G-A-Bb-C-D): the B natural vs Bb is the key difference. This raised 6th gives Dorian its characteristically bright yet minor sound.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l1-q3',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'The Phrygian mode is built starting on which degree of the major scale?',
            options: [
              '3rd degree',
              '2nd degree',
              '5th degree',
              '7th degree'
            ],
            correctAnswer: 0,
            explanation: 'Phrygian begins on the 3rd degree of the major scale. E Phrygian uses the notes of C major starting from E: E-F-G-A-B-C-D-E.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l1-q4',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'What is the most distinctive characteristic of the Phrygian mode?',
            options: [
              'A half step between the 1st and 2nd degrees (lowered 2nd compared to natural minor)',
              'A raised 4th degree',
              'A raised 7th degree',
              'A diminished 5th degree'
            ],
            correctAnswer: 0,
            explanation: 'Phrygian is unique among the modes for having a half step between the 1st and 2nd degrees (a lowered 2nd compared to natural minor). This gives it a dark, Spanish/flamenco character. The interval pattern is H-W-W-W-H-W-W.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l1-q5',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'Which of the following accurately describes the character of Dorian mode?',
            options: [
              'Minor quality with a brighter feel than natural minor, common in jazz and blues',
              'Major quality with a dark, tense feeling',
              'Neither major nor minor, completely ambiguous',
              'Identical in character to the major scale'
            ],
            correctAnswer: 0,
            explanation: 'Dorian has a minor 3rd (giving it a minor quality) but its raised 6th degree compared to natural minor adds brightness. It is widely used in jazz, blues, funk, and rock. Classic examples include many jazz improvisations over minor 7th chords.',
            reference: 'Scales & Modes Ch. 3'
          }
        ]
      },
      {
        id: 'scales-m3-l2',
        title: 'Lydian & Mixolydian Modes',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m3-l2-q1',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'The Lydian mode is built starting on which degree of the major scale?',
            options: [
              '4th degree',
              '5th degree',
              '6th degree',
              '3rd degree'
            ],
            correctAnswer: 0,
            explanation: 'Lydian begins on the 4th degree of the major scale. F Lydian uses the notes of C major starting from F: F-G-A-B-C-D-E-F. Its interval pattern is W-W-W-H-W-W-H.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l2-q2',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'How does the Lydian mode differ from a standard major (Ionian) scale?',
            options: [
              'Lydian has a raised (sharp) 4th degree',
              'Lydian has a lowered 7th degree',
              'Lydian has a lowered 3rd degree',
              'Lydian has a raised 2nd degree'
            ],
            correctAnswer: 0,
            explanation: 'Lydian is identical to the major scale except its 4th degree is raised by a half step (creating an augmented 4th / tritone from the root). This gives Lydian its distinctive dreamy, floating, ethereal quality.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l2-q3',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'The Mixolydian mode is built starting on which degree of the major scale?',
            options: [
              '5th degree',
              '4th degree',
              '6th degree',
              '2nd degree'
            ],
            correctAnswer: 0,
            explanation: 'Mixolydian begins on the 5th degree of the major scale. G Mixolydian uses the notes of C major starting from G: G-A-B-C-D-E-F-G. Its interval pattern is W-W-H-W-W-H-W.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l2-q4',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'How does Mixolydian differ from a standard major (Ionian) scale?',
            options: [
              'Mixolydian has a lowered (flat) 7th degree',
              'Mixolydian has a raised 4th degree',
              'Mixolydian has a lowered 3rd degree',
              'Mixolydian has a raised 6th degree'
            ],
            correctAnswer: 0,
            explanation: 'Mixolydian is identical to the major scale except its 7th degree is lowered by a half step. This creates a "dominant" sound (major triad with a minor 7th) and is widely used in blues, rock, folk, and over dominant 7th chords in jazz.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l2-q5',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'Which mode is commonly associated with dominant 7th chords in jazz and blues?',
            options: [
              'Mixolydian',
              'Dorian',
              'Lydian',
              'Phrygian'
            ],
            correctAnswer: 0,
            explanation: 'Mixolydian is the go-to mode for dominant 7th chords. Its formula (major scale with a flat 7th) naturally outlines a dominant 7th chord (1-3-5-b7). It is foundational in blues, rock, and jazz improvisation over dominant chords.',
            reference: 'Scales & Modes Ch. 3'
          }
        ]
      },
      {
        id: 'scales-m3-l3',
        title: 'Aeolian, Locrian & Mode Identification',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m3-l3-q1',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'The Aeolian mode is equivalent to which common scale?',
            options: [
              'The natural minor scale',
              'The harmonic minor scale',
              'The melodic minor scale',
              'The major pentatonic scale'
            ],
            correctAnswer: 0,
            explanation: 'Aeolian (starting on the 6th degree of the major scale) is identical to the natural minor scale. Its interval pattern is W-H-W-W-H-W-W. A Aeolian = A natural minor = A-B-C-D-E-F-G-A.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l3-q2',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'What makes the Locrian mode unique among the seven church modes?',
            options: [
              'It is the only mode with a diminished 5th (tritone) above the root',
              'It is the only major-sounding mode',
              'It has no half steps',
              'It is the only mode with a raised 4th degree'
            ],
            correctAnswer: 0,
            explanation: 'Locrian (built on the 7th degree of the major scale) is the only mode with a diminished 5th above its root. This means its tonic triad is diminished (1-b3-b5), making it the most unstable and dissonant mode. Its pattern is H-W-W-H-W-W-W.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l3-q3',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'Which of the seven modes are considered "major" modes (having a major 3rd above the root)?',
            options: [
              'Ionian, Lydian, and Mixolydian',
              'Dorian, Phrygian, and Aeolian',
              'Ionian, Dorian, and Lydian',
              'Lydian, Mixolydian, and Locrian'
            ],
            correctAnswer: 0,
            explanation: 'The three major modes are Ionian (standard major), Lydian (#4), and Mixolydian (b7). They all have a major 3rd interval from root to 3rd degree. The minor modes (minor 3rd) are Dorian, Phrygian, Aeolian, and Locrian.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l3-q4',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'If you play all the white keys on a piano from D to D, which mode are you playing?',
            options: [
              'D Dorian',
              'D Phrygian',
              'D Mixolydian',
              'D Aeolian'
            ],
            correctAnswer: 0,
            explanation: 'Playing the white keys from D to D gives D-E-F-G-A-B-C-D, which is D Dorian. Each white-key mode starting on a different note produces a different mode: C=Ionian, D=Dorian, E=Phrygian, F=Lydian, G=Mixolydian, A=Aeolian, B=Locrian.',
            reference: 'Scales & Modes Ch. 3'
          },
          {
            id: 'scales-m3-l3-q5',
            topic: 'Church Modes',
            type: 'multiple-choice',
            text: 'To construct E Phrygian, you would use the same notes as which major scale?',
            options: [
              'C major',
              'E major',
              'G major',
              'A major'
            ],
            correctAnswer: 0,
            explanation: 'Phrygian starts on the 3rd degree of a major scale. E is the 3rd degree of C major. Therefore, E Phrygian uses all the notes of C major (all white keys) but treats E as the tonal center: E-F-G-A-B-C-D-E.',
            reference: 'Scales & Modes Ch. 3'
          }
        ]
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────────────────
  // MODULE 4 — Pentatonic & Blues Scales
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'scales-m4',
    courseId: 'scales',
    title: 'Pentatonic & Blues Scales',
    description: 'Master major pentatonic, minor pentatonic, and blues scales and their common applications.',
    icon: '\uD83C\uDFB8',
    order: 3,
    lessons: [
      {
        id: 'scales-m4-l1',
        title: 'Major & Minor Pentatonic Scales',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m4-l1-q1',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'How many notes are in a pentatonic scale?',
            options: [
              'Five',
              'Six',
              'Seven',
              'Eight'
            ],
            correctAnswer: 0,
            explanation: 'The word "pentatonic" comes from the Greek "pente" (five) and "tonos" (tone). Pentatonic scales contain five notes per octave, as opposed to seven in major/minor scales. Their simplicity and lack of half steps make them versatile and consonant.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l1-q2',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'Which scale degrees make up the major pentatonic scale?',
            options: [
              '1, 2, 3, 5, 6',
              '1, 2, 3, 4, 5',
              '1, 3, 4, 5, 7',
              '1, 2, 4, 5, 7'
            ],
            correctAnswer: 0,
            explanation: 'The major pentatonic scale uses degrees 1-2-3-5-6 of the major scale, omitting the 4th and 7th degrees. By removing these two notes, all half steps are eliminated, creating a scale with no dissonant intervals. C major pentatonic: C-D-E-G-A.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l1-q3',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'Which scale degrees make up the minor pentatonic scale?',
            options: [
              '1, b3, 4, 5, b7',
              '1, 2, b3, 5, 6',
              '1, b3, 4, b5, b7',
              '1, b2, b3, 5, b7'
            ],
            correctAnswer: 0,
            explanation: 'The minor pentatonic uses degrees 1-b3-4-5-b7. It is derived from the natural minor by removing the 2nd and 6th degrees. A minor pentatonic: A-C-D-E-G. It is the most commonly used scale in rock, blues, and pop guitar.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l1-q4',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'What is the relationship between A minor pentatonic and C major pentatonic?',
            options: [
              'They contain the same five notes (A-C-D-E-G) -- they are relative pentatonics',
              'They share only three notes in common',
              'They contain completely different notes',
              'A minor pentatonic has one additional note compared to C major pentatonic'
            ],
            correctAnswer: 0,
            explanation: 'Just like relative major and minor scales, relative pentatonic scales share the same notes. A minor pentatonic (A-C-D-E-G) and C major pentatonic (C-D-E-G-A) contain the exact same five pitches, just with different tonal centers.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l1-q5',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'Why are pentatonic scales considered particularly useful for improvisation?',
            options: [
              'They contain no half steps, so nearly every note sounds consonant against the underlying chord',
              'They contain more notes than other scales, giving more options',
              'They can only be played in the key of C',
              'They contain all the chromatic notes needed for any melody'
            ],
            correctAnswer: 0,
            explanation: 'Pentatonic scales remove the two notes from the major/minor scale that create half-step tension (the 4th and 7th in major, or the 2nd and 6th in minor). Without half steps, virtually any note in the scale sounds pleasant, making them forgiving and ideal for improvisation.',
            reference: 'Scales & Modes Ch. 4'
          }
        ]
      },
      {
        id: 'scales-m4-l2',
        title: 'The Blues Scale',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m4-l2-q1',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'The blues scale is formed by adding which note to the minor pentatonic scale?',
            options: [
              'A flat 5th (sharp 4th), also called the "blue note"',
              'A natural 7th (major 7th)',
              'A sharp 2nd (augmented 2nd)',
              'A natural 6th (major 6th)'
            ],
            correctAnswer: 0,
            explanation: 'The blues scale adds the b5 (enharmonically the #4) to the minor pentatonic: 1-b3-4-b5-5-b7. This chromatic passing tone between the 4th and 5th is called the "blue note" and gives the blues scale its distinctive gritty, soulful sound.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l2-q2',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'What are the notes in the A blues scale?',
            options: [
              'A-C-D-Eb-E-G',
              'A-B-C-D-E-G',
              'A-C-D-E-F#-G',
              'A-Bb-C-D-Eb-G'
            ],
            correctAnswer: 0,
            explanation: 'A blues scale = A minor pentatonic (A-C-D-E-G) plus the blue note (Eb/D#, which is the b5): A-C-D-Eb-E-G. The Eb is a chromatic passing tone that creates tension between the 4th (D) and 5th (E).',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l2-q3',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'How many notes are in a blues scale?',
            options: [
              'Six',
              'Five',
              'Seven',
              'Eight'
            ],
            correctAnswer: 0,
            explanation: 'The blues scale has six notes (sometimes called a "hexatonic" scale). It is the five notes of the minor pentatonic plus one chromatic passing tone (the b5/blue note): 1-b3-4-b5-5-b7.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l2-q4',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'In blues music, "blue notes" typically refer to:',
            options: [
              'Notes that are bent or played between the standard pitches, especially the b3, b5, and b7',
              'Notes played only on blue-colored piano keys',
              'Notes that are always sharp',
              'The first and last notes of a blues scale'
            ],
            correctAnswer: 0,
            explanation: 'Blue notes are microtonal inflections -- notes bent or played slightly flat relative to standard pitch. The primary blue notes are the b3, b5, and b7 scale degrees. Vocalists and instrumentalists often bend between the minor and major 3rd for expressive effect.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l2-q5',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'A common blues technique is to use the minor pentatonic/blues scale over a dominant 7th chord even though the chord contains a major 3rd. What does this create?',
            options: [
              'A tension between the minor 3rd in the scale and the major 3rd in the chord, which is a hallmark of the blues sound',
              'A perfect consonance with no tension',
              'An atonal, dissonant effect that should be avoided',
              'A key change to the relative minor'
            ],
            correctAnswer: 0,
            explanation: 'Playing a minor pentatonic or blues scale over a dominant 7th chord creates the classic blues clash between the b3 in the scale and the natural 3 in the chord. Rather than sounding "wrong," this tension is the defining characteristic of blues expression.',
            reference: 'Scales & Modes Ch. 4'
          }
        ]
      },
      {
        id: 'scales-m4-l3',
        title: 'Applying Pentatonic & Blues Scales',
        xpReward: 10,
        questions: [
          {
            id: 'scales-m4-l3-q1',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'Over a standard 12-bar blues in the key of A, which blues scale works over the entire progression?',
            options: [
              'A blues scale',
              'D blues scale',
              'E blues scale',
              'C blues scale'
            ],
            correctAnswer: 0,
            explanation: 'In a blues progression, the blues scale built on the tonic (root key) can be used over the entire 12-bar form -- over the I, IV, and V chords. In a blues in A, the A blues scale (A-C-D-Eb-E-G) works throughout the progression.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l3-q2',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'The major pentatonic scale is commonly associated with which musical style?',
            options: [
              'Country, folk, and pop melodies',
              'Heavy metal exclusively',
              'Classical symphonic writing only',
              'Twelve-tone serial composition'
            ],
            correctAnswer: 0,
            explanation: 'The major pentatonic scale is prevalent in country, folk, pop, gospel, and many world music traditions. Its bright, happy, open sound (think of the melody of "My Girl" or "Amazing Grace") makes it one of the most universal scales in music.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l3-q3',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'When soloing over a minor chord progression, which pentatonic scale is the most common starting choice?',
            options: [
              'The minor pentatonic scale built on the root of the key',
              'The major pentatonic scale built on the 5th',
              'The minor pentatonic scale built on the 4th',
              'The major pentatonic scale built on the root'
            ],
            correctAnswer: 0,
            explanation: 'The minor pentatonic scale built on the root of the key is the default choice for minor chord progressions. For example, over a progression in A minor, the A minor pentatonic (A-C-D-E-G) provides a safe, consonant foundation.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l3-q4',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'What is "hybrid" pentatonic playing?',
            options: [
              'Combining the major and minor pentatonic scales in the same key for a wider range of expression',
              'Playing two pentatonic scales in different keys simultaneously',
              'Using a pentatonic scale with all five notes played at once as a chord',
              'Playing the pentatonic scale backwards only'
            ],
            correctAnswer: 0,
            explanation: 'Hybrid pentatonic playing mixes notes from both the major and minor pentatonic scales of the same root. For example, combining A major pentatonic (A-B-C#-E-F#) with A minor pentatonic (A-C-D-E-G) creates a rich palette with both the major and minor 3rd available.',
            reference: 'Scales & Modes Ch. 4'
          },
          {
            id: 'scales-m4-l3-q5',
            topic: 'Pentatonic & Blues Scales',
            type: 'multiple-choice',
            text: 'Why is the minor pentatonic scale often the first scale taught to beginner guitarists?',
            options: [
              'It has only five notes, no half steps create dissonance, and a single box pattern covers many musical situations',
              'It is the only scale that works on guitar',
              'It requires knowledge of all 12 keys before use',
              'It can only be played in one position on the fretboard'
            ],
            correctAnswer: 0,
            explanation: 'The minor pentatonic is beginner-friendly because it has just five notes (easy to memorize), contains no half-step intervals (hard to sound "bad"), and its box pattern on guitar is compact and moveable. It works across rock, blues, pop, and many other genres.',
            reference: 'Scales & Modes Ch. 4'
          }
        ]
      }
    ]
  }
]
