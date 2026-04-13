import type { Module } from '../types'

export const chordModules: Module[] = [
  // ─── Module 1: Major & Minor Triads ──────────────────────────────────────────
  {
    id: 'chords-m1',
    courseId: 'chords',
    title: 'Major & Minor Triads',
    description: 'Learn to build and identify major and minor triads in root position.',
    icon: '🎵',
    order: 0,
    lessons: [
      {
        id: 'chords-m1-l1',
        title: 'Building Major Triads',
        xpReward: 10,
        questions: [
          { id: 'chords-m1-l1-q1', topic: 'Triads', type: 'multiple-choice', text: 'A major triad is constructed using which intervals from the root?', options: ['Major 3rd and perfect 5th', 'Minor 3rd and perfect 5th', 'Major 3rd and augmented 5th', 'Perfect 4th and perfect 5th'], correctAnswer: 0, explanation: 'A major triad consists of a root, a major 3rd (4 semitones above the root), and a perfect 5th (7 semitones above the root).', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l1-q2', topic: 'Triads', type: 'multiple-choice', text: 'What are the notes in a C major triad?', options: ['C, E, G', 'C, Eb, G', 'C, E, G#', 'C, D, G'], correctAnswer: 0, explanation: 'C major triad: root C, major 3rd E (4 semitones up), perfect 5th G (7 semitones up from C).', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l1-q3', topic: 'Triads', type: 'multiple-choice', text: 'How many semitones are in a major 3rd interval?', options: ['4 semitones', '3 semitones', '5 semitones', '2 semitones'], correctAnswer: 0, explanation: 'A major 3rd spans 4 semitones (half steps). For example, C to E is 4 semitones: C-C#-D-D#-E.', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l1-q4', topic: 'Triads', type: 'multiple-choice', text: 'What are the notes in a G major triad?', options: ['G, B, D', 'G, Bb, D', 'G, B, D#', 'G, A, D'], correctAnswer: 0, explanation: 'G major triad: root G, major 3rd B, perfect 5th D.', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l1-q5', topic: 'Triads', type: 'multiple-choice', text: 'In a major triad, the interval between the 3rd and the 5th is:', options: ['A minor 3rd (3 semitones)', 'A major 3rd (4 semitones)', 'A perfect 4th (5 semitones)', 'A major 2nd (2 semitones)'], correctAnswer: 0, explanation: 'In a major triad the bottom interval is a major 3rd (4 semitones) and the top interval is a minor 3rd (3 semitones). Together they span a perfect 5th (7 semitones).', reference: 'Chord Theory Ch. 1' }
        ]
      },
      {
        id: 'chords-m1-l2',
        title: 'Building Minor Triads',
        xpReward: 10,
        questions: [
          { id: 'chords-m1-l2-q1', topic: 'Triads', type: 'multiple-choice', text: 'A minor triad is constructed using which intervals from the root?', options: ['Minor 3rd and perfect 5th', 'Major 3rd and perfect 5th', 'Minor 3rd and diminished 5th', 'Major 3rd and minor 6th'], correctAnswer: 0, explanation: 'A minor triad consists of a root, a minor 3rd (3 semitones above the root), and a perfect 5th (7 semitones above the root).', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l2-q2', topic: 'Triads', type: 'multiple-choice', text: 'What are the notes in an A minor triad?', options: ['A, C, E', 'A, C#, E', 'A, C, Eb', 'A, B, E'], correctAnswer: 0, explanation: 'A minor triad: root A, minor 3rd C (3 semitones up), perfect 5th E (7 semitones up from A).', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l2-q3', topic: 'Triads', type: 'multiple-choice', text: 'How does a minor triad differ from a major triad?', options: ['The 3rd is lowered by one semitone', 'The 5th is lowered by one semitone', 'The root is raised by one semitone', 'The 3rd is raised by one semitone'], correctAnswer: 0, explanation: 'The only difference between a major and minor triad is the 3rd: a minor triad has a flatted (lowered by one semitone) 3rd compared to the major triad.', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l2-q4', topic: 'Triads', type: 'multiple-choice', text: 'What are the notes in a D minor triad?', options: ['D, F, A', 'D, F#, A', 'D, F, Ab', 'D, Eb, A'], correctAnswer: 0, explanation: 'D minor triad: root D, minor 3rd F (3 semitones up), perfect 5th A (7 semitones up from D).', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l2-q5', topic: 'Triads', type: 'multiple-choice', text: 'In a minor triad, the interval between the 3rd and the 5th is:', options: ['A major 3rd (4 semitones)', 'A minor 3rd (3 semitones)', 'A perfect 4th (5 semitones)', 'A diminished 3rd (2 semitones)'], correctAnswer: 0, explanation: 'In a minor triad the bottom interval is a minor 3rd (3 semitones) and the top interval is a major 3rd (4 semitones). This is the reverse stacking compared to a major triad.', reference: 'Chord Theory Ch. 1' }
        ]
      },
      {
        id: 'chords-m1-l3',
        title: 'Identifying Triads by Ear and on Paper',
        xpReward: 10,
        questions: [
          { id: 'chords-m1-l3-q1', topic: 'Triads', type: 'multiple-choice', text: 'Which triad contains the notes E, G#, B?', options: ['E major', 'E minor', 'G# minor', 'B major'], correctAnswer: 0, explanation: 'E to G# is a major 3rd (4 semitones) and E to B is a perfect 5th (7 semitones), making this an E major triad.', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l3-q2', topic: 'Triads', type: 'multiple-choice', text: 'Which triad contains the notes F, Ab, C?', options: ['F minor', 'F major', 'Ab major', 'C minor'], correctAnswer: 0, explanation: 'F to Ab is a minor 3rd (3 semitones) and F to C is a perfect 5th (7 semitones), making this an F minor triad.', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l3-q3', topic: 'Triads', type: 'multiple-choice', text: 'What are the notes in a Bb major triad?', options: ['Bb, D, F', 'Bb, Db, F', 'Bb, D, F#', 'Bb, C, F'], correctAnswer: 0, explanation: 'Bb major triad: root Bb, major 3rd D (4 semitones up), perfect 5th F (7 semitones up from Bb).', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l3-q4', topic: 'Triads', type: 'multiple-choice', text: 'A triad with the notes B, D, F# is:', options: ['B minor', 'B major', 'D major', 'F# minor'], correctAnswer: 0, explanation: 'B to D is a minor 3rd (3 semitones) and B to F# is a perfect 5th (7 semitones), making this a B minor triad.', reference: 'Chord Theory Ch. 1' },
          { id: 'chords-m1-l3-q5', topic: 'Triads', type: 'multiple-choice', text: 'In the key of F major, what is the quality of the chord built on the 2nd scale degree (G)?', options: ['Minor (Gm)', 'Major (G)', 'Diminished (Gdim)', 'Augmented (Gaug)'], correctAnswer: 0, explanation: 'In any major key, the chord built on the 2nd scale degree (ii) is always minor. In F major, the notes G, Bb, D form a G minor triad.', reference: 'Chord Theory Ch. 1' }
        ]
      }
    ]
  },

  // ─── Module 2: Diminished & Augmented Triads ─────────────────────────────────
  {
    id: 'chords-m2',
    courseId: 'chords',
    title: 'Diminished & Augmented Triads',
    description: 'Understand diminished and augmented triads: construction, identification, and sound quality.',
    icon: '🔻',
    order: 1,
    lessons: [
      {
        id: 'chords-m2-l1',
        title: 'Diminished Triads',
        xpReward: 10,
        questions: [
          { id: 'chords-m2-l1-q1', topic: 'Diminished Triads', type: 'multiple-choice', text: 'A diminished triad is constructed using which intervals from the root?', options: ['Minor 3rd and diminished 5th', 'Major 3rd and diminished 5th', 'Minor 3rd and perfect 5th', 'Minor 3rd and augmented 5th'], correctAnswer: 0, explanation: 'A diminished triad consists of a root, a minor 3rd (3 semitones), and a diminished 5th (6 semitones, also called a tritone).', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l1-q2', topic: 'Diminished Triads', type: 'multiple-choice', text: 'What are the notes in a B diminished triad?', options: ['B, D, F', 'B, D#, F', 'B, D, F#', 'B, Db, F'], correctAnswer: 0, explanation: 'B diminished: root B, minor 3rd D (3 semitones up), diminished 5th F (6 semitones up from B).', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l1-q3', topic: 'Diminished Triads', type: 'multiple-choice', text: 'In a major key, a diminished triad naturally occurs on which scale degree?', options: ['The 7th degree (vii)', 'The 5th degree (V)', 'The 2nd degree (ii)', 'The 4th degree (IV)'], correctAnswer: 0, explanation: 'In a major key, the triad built on the 7th scale degree is diminished (vii). For example, in C major, the B diminished triad (B, D, F) is built on the 7th degree.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l1-q4', topic: 'Diminished Triads', type: 'multiple-choice', text: 'How many semitones make up a diminished 5th (tritone)?', options: ['6 semitones', '7 semitones', '5 semitones', '8 semitones'], correctAnswer: 0, explanation: 'A diminished 5th, also called a tritone, spans exactly 6 semitones. It divides the octave perfectly in half.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l1-q5', topic: 'Diminished Triads', type: 'multiple-choice', text: 'The interval between the two 3rds in a diminished triad is:', options: ['Two stacked minor 3rds (3 + 3 semitones)', 'A minor 3rd plus a major 3rd (3 + 4 semitones)', 'A major 3rd plus a minor 3rd (4 + 3 semitones)', 'Two stacked major 3rds (4 + 4 semitones)'], correctAnswer: 0, explanation: 'A diminished triad is built from two stacked minor 3rds: root to 3rd is 3 semitones, and 3rd to 5th is another 3 semitones, totaling 6 semitones (a tritone).', reference: 'Chord Theory Ch. 2' }
        ]
      },
      {
        id: 'chords-m2-l2',
        title: 'Augmented Triads',
        xpReward: 10,
        questions: [
          { id: 'chords-m2-l2-q1', topic: 'Augmented Triads', type: 'multiple-choice', text: 'An augmented triad is constructed using which intervals from the root?', options: ['Major 3rd and augmented 5th', 'Major 3rd and perfect 5th', 'Minor 3rd and augmented 5th', 'Major 3rd and diminished 5th'], correctAnswer: 0, explanation: 'An augmented triad consists of a root, a major 3rd (4 semitones), and an augmented 5th (8 semitones above the root).', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l2-q2', topic: 'Augmented Triads', type: 'multiple-choice', text: 'What are the notes in a C augmented triad (C+)?', options: ['C, E, G#', 'C, E, G', 'C, Eb, G#', 'C, E, Ab'], correctAnswer: 0, explanation: 'C augmented: root C, major 3rd E (4 semitones), augmented 5th G# (8 semitones up from C).', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l2-q3', topic: 'Augmented Triads', type: 'multiple-choice', text: 'The interval stacking in an augmented triad is:', options: ['Two stacked major 3rds (4 + 4 semitones)', 'A major 3rd plus a minor 3rd (4 + 3 semitones)', 'Two stacked minor 3rds (3 + 3 semitones)', 'A minor 3rd plus a major 3rd (3 + 4 semitones)'], correctAnswer: 0, explanation: 'An augmented triad is built from two stacked major 3rds: 4 semitones + 4 semitones = 8 semitones total from root to augmented 5th.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l2-q4', topic: 'Augmented Triads', type: 'multiple-choice', text: 'An augmented triad divides the octave into how many equal parts?', options: ['3 equal parts', '2 equal parts', '4 equal parts', '6 equal parts'], correctAnswer: 0, explanation: 'Since an augmented triad is built from two major 3rds (each 4 semitones), it divides the 12-semitone octave into 3 equal parts of 4 semitones each.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l2-q5', topic: 'Augmented Triads', type: 'multiple-choice', text: 'Which of these is an Ab augmented triad?', options: ['Ab, C, E', 'Ab, Cb, E', 'Ab, C, Eb', 'Ab, B, E'], correctAnswer: 0, explanation: 'Ab augmented: root Ab, major 3rd C (4 semitones up), augmented 5th E (8 semitones up from Ab).', reference: 'Chord Theory Ch. 2' }
        ]
      },
      {
        id: 'chords-m2-l3',
        title: 'Comparing All Four Triad Qualities',
        xpReward: 10,
        questions: [
          { id: 'chords-m2-l3-q1', topic: 'Triad Qualities', type: 'multiple-choice', text: 'Which triad quality has a root, major 3rd, and perfect 5th?', options: ['Major', 'Minor', 'Diminished', 'Augmented'], correctAnswer: 0, explanation: 'A major triad is built with a major 3rd (4 semitones) and a perfect 5th (7 semitones) above the root.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l3-q2', topic: 'Triad Qualities', type: 'multiple-choice', text: 'Which triad quality contains a tritone (diminished 5th)?', options: ['Diminished', 'Major', 'Minor', 'Augmented'], correctAnswer: 0, explanation: 'The diminished triad contains a tritone (diminished 5th, 6 semitones) between the root and the 5th. Major and minor triads have perfect 5ths; augmented triads have augmented 5ths.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l3-q3', topic: 'Triad Qualities', type: 'multiple-choice', text: 'How many semitones separate the root and 5th of an augmented triad?', options: ['8 semitones', '7 semitones', '6 semitones', '9 semitones'], correctAnswer: 0, explanation: 'An augmented 5th spans 8 semitones. Compare: perfect 5th = 7 semitones, diminished 5th = 6 semitones.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l3-q4', topic: 'Triad Qualities', type: 'multiple-choice', text: 'A triad with the notes D, F, Ab is what quality?', options: ['Diminished', 'Minor', 'Major', 'Augmented'], correctAnswer: 0, explanation: 'D to F is a minor 3rd (3 semitones), and D to Ab is a diminished 5th (6 semitones). Minor 3rd + diminished 5th = diminished triad.', reference: 'Chord Theory Ch. 2' },
          { id: 'chords-m2-l3-q5', topic: 'Triad Qualities', type: 'multiple-choice', text: 'A triad with the notes F, A, C# is what quality?', options: ['Augmented', 'Major', 'Minor', 'Diminished'], correctAnswer: 0, explanation: 'F to A is a major 3rd (4 semitones), and F to C# is an augmented 5th (8 semitones). Major 3rd + augmented 5th = augmented triad.', reference: 'Chord Theory Ch. 2' }
        ]
      }
    ]
  },

  // ─── Module 3: Seventh Chords ────────────────────────────────────────────────
  {
    id: 'chords-m3',
    courseId: 'chords',
    title: 'Seventh Chords',
    description: 'Master major 7th, minor 7th, dominant 7th, diminished 7th, and half-diminished 7th chords.',
    icon: '7️⃣',
    order: 2,
    lessons: [
      {
        id: 'chords-m3-l1',
        title: 'Major 7th & Dominant 7th Chords',
        xpReward: 10,
        questions: [
          { id: 'chords-m3-l1-q1', topic: 'Seventh Chords', type: 'multiple-choice', text: 'A major 7th chord (Cmaj7) is built using which formula?', options: ['Root, major 3rd, perfect 5th, major 7th', 'Root, major 3rd, perfect 5th, minor 7th', 'Root, minor 3rd, perfect 5th, major 7th', 'Root, major 3rd, augmented 5th, major 7th'], correctAnswer: 0, explanation: 'A major 7th chord is a major triad with a major 7th added on top. In Cmaj7: C, E, G, B. The major 7th is 11 semitones above the root.', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l1-q2', topic: 'Seventh Chords', type: 'multiple-choice', text: 'What are the notes in a Cmaj7 chord?', options: ['C, E, G, B', 'C, E, G, Bb', 'C, Eb, G, Bb', 'C, E, G#, B'], correctAnswer: 0, explanation: 'Cmaj7 = C major triad (C, E, G) plus the major 7th (B natural, 11 semitones above C).', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l1-q3', topic: 'Seventh Chords', type: 'multiple-choice', text: 'A dominant 7th chord (C7) is built using which formula?', options: ['Root, major 3rd, perfect 5th, minor 7th', 'Root, major 3rd, perfect 5th, major 7th', 'Root, minor 3rd, perfect 5th, minor 7th', 'Root, major 3rd, diminished 5th, minor 7th'], correctAnswer: 0, explanation: 'A dominant 7th chord is a major triad with a minor 7th (10 semitones above the root). In C7: C, E, G, Bb.', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l1-q4', topic: 'Seventh Chords', type: 'multiple-choice', text: 'What are the notes in a G7 (G dominant 7th) chord?', options: ['G, B, D, F', 'G, B, D, F#', 'G, Bb, D, F', 'G, B, D#, F'], correctAnswer: 0, explanation: 'G7 = G major triad (G, B, D) plus the minor 7th (F natural, 10 semitones above G).', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l1-q5', topic: 'Seventh Chords', type: 'multiple-choice', text: 'What distinguishes a dominant 7th chord from a major 7th chord?', options: ['The dominant 7th has a minor 7th interval; the major 7th has a major 7th interval', 'The dominant 7th has a minor 3rd; the major 7th has a major 3rd', 'The dominant 7th has an augmented 5th; the major 7th has a perfect 5th', 'There is no difference; the names are interchangeable'], correctAnswer: 0, explanation: 'Both chords have a major triad as their foundation. The difference is the 7th: dominant 7th uses a minor 7th (10 semitones), while major 7th uses a major 7th (11 semitones).', reference: 'Chord Theory Ch. 3' }
        ]
      },
      {
        id: 'chords-m3-l2',
        title: 'Minor 7th & Half-Diminished 7th Chords',
        xpReward: 10,
        questions: [
          { id: 'chords-m3-l2-q1', topic: 'Seventh Chords', type: 'multiple-choice', text: 'A minor 7th chord (Cm7) is built using which formula?', options: ['Root, minor 3rd, perfect 5th, minor 7th', 'Root, minor 3rd, perfect 5th, major 7th', 'Root, major 3rd, perfect 5th, minor 7th', 'Root, minor 3rd, diminished 5th, minor 7th'], correctAnswer: 0, explanation: 'A minor 7th chord is a minor triad with a minor 7th added. In Cm7: C, Eb, G, Bb.', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l2-q2', topic: 'Seventh Chords', type: 'multiple-choice', text: 'What are the notes in an Am7 (A minor 7th) chord?', options: ['A, C, E, G', 'A, C#, E, G', 'A, C, E, G#', 'A, C, Eb, G'], correctAnswer: 0, explanation: 'Am7 = A minor triad (A, C, E) plus the minor 7th (G natural, 10 semitones above A).', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l2-q3', topic: 'Seventh Chords', type: 'multiple-choice', text: 'A half-diminished 7th chord (also written m7b5) is built using which formula?', options: ['Root, minor 3rd, diminished 5th, minor 7th', 'Root, minor 3rd, diminished 5th, diminished 7th', 'Root, minor 3rd, perfect 5th, minor 7th', 'Root, major 3rd, diminished 5th, minor 7th'], correctAnswer: 0, explanation: 'A half-diminished 7th chord is a diminished triad plus a minor 7th. For example, Bm7b5: B, D, F, A.', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l2-q4', topic: 'Seventh Chords', type: 'multiple-choice', text: 'What are the notes in Bm7b5 (B half-diminished 7th)?', options: ['B, D, F, A', 'B, D, F#, A', 'B, D, F, Ab', 'B, D#, F, A'], correctAnswer: 0, explanation: 'Bm7b5 = B diminished triad (B, D, F) plus a minor 7th (A natural, 10 semitones above B).', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l2-q5', topic: 'Seventh Chords', type: 'multiple-choice', text: 'In the key of C major, the chord built on the 2nd degree (D) with a 7th added is:', options: ['Dm7 (D minor 7th)', 'D7 (D dominant 7th)', 'Dmaj7 (D major 7th)', 'Ddim7 (D diminished 7th)'], correctAnswer: 0, explanation: 'In C major, the ii chord is D minor (D, F, A). Adding the diatonic 7th (C) gives Dm7 (D, F, A, C).', reference: 'Chord Theory Ch. 3' }
        ]
      },
      {
        id: 'chords-m3-l3',
        title: 'Diminished 7th Chords & Review',
        xpReward: 10,
        questions: [
          { id: 'chords-m3-l3-q1', topic: 'Seventh Chords', type: 'multiple-choice', text: 'A fully diminished 7th chord is built using which formula?', options: ['Root, minor 3rd, diminished 5th, diminished 7th', 'Root, minor 3rd, diminished 5th, minor 7th', 'Root, major 3rd, diminished 5th, diminished 7th', 'Root, minor 3rd, perfect 5th, diminished 7th'], correctAnswer: 0, explanation: 'A fully diminished 7th chord stacks three minor 3rds: root, minor 3rd, diminished 5th, and diminished 7th (9 semitones above root).', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l3-q2', topic: 'Seventh Chords', type: 'multiple-choice', text: 'What are the notes in a Cdim7 (C fully diminished 7th) chord?', options: ['C, Eb, Gb, Bbb (A)', 'C, Eb, Gb, Bb', 'C, Eb, G, Bbb', 'C, E, Gb, Bbb'], correctAnswer: 0, explanation: 'Cdim7: root C, minor 3rd Eb, diminished 5th Gb, diminished 7th Bbb (enharmonically A). Each interval is a minor 3rd (3 semitones).', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l3-q3', topic: 'Seventh Chords', type: 'multiple-choice', text: 'A diminished 7th chord divides the octave into how many equal parts?', options: ['4 equal parts (minor 3rds)', '3 equal parts (major 3rds)', '2 equal parts (tritones)', '6 equal parts (whole steps)'], correctAnswer: 0, explanation: 'A diminished 7th chord consists of four notes, each separated by a minor 3rd (3 semitones). This divides the 12-semitone octave into 4 equal parts.', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l3-q4', topic: 'Seventh Chords', type: 'multiple-choice', text: 'How does a half-diminished 7th differ from a fully diminished 7th?', options: ['The half-diminished has a minor 7th; the fully diminished has a diminished 7th', 'The half-diminished has a perfect 5th; the fully diminished has a diminished 5th', 'The half-diminished has a major 3rd; the fully diminished has a minor 3rd', 'There is no difference; the terms are interchangeable'], correctAnswer: 0, explanation: 'Both share a diminished triad (root, minor 3rd, diminished 5th). The difference is the 7th: half-diminished uses minor 7th (10 semitones), fully diminished uses diminished 7th (9 semitones).', reference: 'Chord Theory Ch. 3' },
          { id: 'chords-m3-l3-q5', topic: 'Seventh Chords', type: 'multiple-choice', text: 'In the key of C major, the chord built on the 5th degree (G) with a 7th is:', options: ['G7 (G dominant 7th)', 'Gmaj7 (G major 7th)', 'Gm7 (G minor 7th)', 'Gdim7 (G diminished 7th)'], correctAnswer: 0, explanation: 'In C major, the V chord is G major (G, B, D). Adding the diatonic 7th (F) gives G7 (G, B, D, F), a dominant 7th chord. The V7 is always a dominant 7th in a major key.', reference: 'Chord Theory Ch. 3' }
        ]
      }
    ]
  },

  // ─── Module 4: Chord Inversions ──────────────────────────────────────────────
  {
    id: 'chords-m4',
    courseId: 'chords',
    title: 'Chord Inversions',
    description: 'Learn first, second, and third inversions, slash chords, and figured bass notation.',
    icon: '🔄',
    order: 3,
    lessons: [
      {
        id: 'chords-m4-l1',
        title: 'First & Second Inversions of Triads',
        xpReward: 10,
        questions: [
          { id: 'chords-m4-l1-q1', topic: 'Inversions', type: 'multiple-choice', text: 'A triad is in first inversion when which note is in the bass?', options: ['The 3rd of the chord', 'The 5th of the chord', 'The root of the chord', 'The 7th of the chord'], correctAnswer: 0, explanation: 'First inversion places the 3rd of the chord in the bass. For example, C major first inversion is E, G, C (with E in the bass).', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l1-q2', topic: 'Inversions', type: 'multiple-choice', text: 'A C major triad in second inversion has which note in the bass?', options: ['G', 'E', 'C', 'B'], correctAnswer: 0, explanation: 'Second inversion places the 5th of the chord in the bass. C major second inversion: G, C, E (with G in the bass).', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l1-q3', topic: 'Inversions', type: 'multiple-choice', text: 'In figured bass notation, a triad in first inversion is indicated by:', options: ['6 (or 6/3)', '6/4', '5/3', '4/2'], correctAnswer: 0, explanation: 'First inversion triads are labeled 6 or 6/3 in figured bass, referring to the intervals above the bass note (a 6th and a 3rd).', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l1-q4', topic: 'Inversions', type: 'multiple-choice', text: 'In figured bass notation, a triad in second inversion is indicated by:', options: ['6/4', '6/3', '5/3', '7'], correctAnswer: 0, explanation: 'Second inversion triads are labeled 6/4 in figured bass, referring to the intervals of a 6th and a 4th above the bass note.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l1-q5', topic: 'Inversions', type: 'multiple-choice', text: 'The voicing E, G, C represents which chord and inversion?', options: ['C major, first inversion', 'E minor, root position', 'C major, second inversion', 'A minor, first inversion'], correctAnswer: 0, explanation: 'The notes E, G, C spell a C major triad. Since E (the 3rd) is in the bass, it is in first inversion.', reference: 'Chord Theory Ch. 4' }
        ]
      },
      {
        id: 'chords-m4-l2',
        title: 'Seventh Chord Inversions',
        xpReward: 10,
        questions: [
          { id: 'chords-m4-l2-q1', topic: 'Inversions', type: 'multiple-choice', text: 'A 7th chord in third inversion has which note in the bass?', options: ['The 7th of the chord', 'The 5th of the chord', 'The 3rd of the chord', 'The root of the chord'], correctAnswer: 0, explanation: 'Third inversion places the 7th of the chord in the bass. For example, G7 in third inversion: F, G, B, D.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l2-q2', topic: 'Inversions', type: 'multiple-choice', text: 'In figured bass, a 7th chord in root position is indicated by:', options: ['7', '6/5', '4/3', '4/2'], correctAnswer: 0, explanation: 'A root position 7th chord is simply labeled 7 in figured bass notation.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l2-q3', topic: 'Inversions', type: 'multiple-choice', text: 'In figured bass, a 7th chord in first inversion is indicated by:', options: ['6/5', '4/3', '4/2', '7'], correctAnswer: 0, explanation: 'A first inversion 7th chord (3rd in bass) is labeled 6/5 in figured bass notation.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l2-q4', topic: 'Inversions', type: 'multiple-choice', text: 'In figured bass, a 7th chord in second inversion is indicated by:', options: ['4/3', '6/5', '4/2', '6/4'], correctAnswer: 0, explanation: 'A second inversion 7th chord (5th in bass) is labeled 4/3 in figured bass notation.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l2-q5', topic: 'Inversions', type: 'multiple-choice', text: 'The voicing Bb, C, E, G represents which chord and inversion?', options: ['C7, third inversion', 'Bb major 7th, root position', 'C7, first inversion', 'Bb major, second inversion'], correctAnswer: 0, explanation: 'The notes C, E, G, Bb spell a C7 chord. Since Bb (the 7th) is in the bass, this is C7 in third inversion.', reference: 'Chord Theory Ch. 4' }
        ]
      },
      {
        id: 'chords-m4-l3',
        title: 'Slash Chords & Practical Applications',
        xpReward: 10,
        questions: [
          { id: 'chords-m4-l3-q1', topic: 'Inversions', type: 'multiple-choice', text: 'The slash chord C/E indicates:', options: ['A C major chord with E in the bass', 'A C major chord followed by an E chord', 'A C chord over an E major chord', 'An E chord with C on top'], correctAnswer: 0, explanation: 'Slash chord notation places the chord symbol before the slash and the bass note after. C/E means a C major chord with E as the lowest note (first inversion).', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l3-q2', topic: 'Inversions', type: 'multiple-choice', text: 'The slash chord G/B indicates:', options: ['G major in first inversion', 'G major in second inversion', 'B minor with G in the bass', 'G major in root position'], correctAnswer: 0, explanation: 'G/B means a G major chord (G, B, D) with B in the bass. Since B is the 3rd of G major, this is first inversion.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l3-q3', topic: 'Inversions', type: 'multiple-choice', text: 'What is a common use of a cadential 6/4 chord (second inversion)?', options: ['To precede the dominant chord at a cadence point', 'To substitute for a tonic chord in the opening', 'To modulate to a distant key', 'To replace the subdominant in a plagal cadence'], correctAnswer: 0, explanation: 'The cadential 6/4 is a tonic triad in second inversion (e.g., C/G in the key of C) that typically resolves to the dominant (V) chord at a cadence, creating a strong resolution.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l3-q4', topic: 'Inversions', type: 'multiple-choice', text: 'The slash chord F/A indicates:', options: ['F major in first inversion', 'F major in second inversion', 'A minor with F in the bass', 'F major in root position'], correctAnswer: 0, explanation: 'F/A means an F major chord (F, A, C) with A in the bass. Since A is the 3rd of F major, this is first inversion.', reference: 'Chord Theory Ch. 4' },
          { id: 'chords-m4-l3-q5', topic: 'Inversions', type: 'multiple-choice', text: 'Why are inversions important in voice leading?', options: ['They allow smoother bass line movement between chords', 'They change the chord quality from major to minor', 'They add additional notes to the chord', 'They transpose the chord to a different key'], correctAnswer: 0, explanation: 'Inversions keep the bass line moving by small intervals (steps) rather than large leaps, creating smoother voice leading and more musical chord progressions.', reference: 'Chord Theory Ch. 4' }
        ]
      }
    ]
  },

  // ─── Module 5: Chord Progressions ────────────────────────────────────────────
  {
    id: 'chords-m5',
    courseId: 'chords',
    title: 'Chord Progressions',
    description: 'Understand I-IV-V, ii-V-I, common pop progressions, cadences, and harmonic function.',
    icon: '🎹',
    order: 4,
    lessons: [
      {
        id: 'chords-m5-l1',
        title: 'I-IV-V and Basic Harmonic Function',
        xpReward: 10,
        questions: [
          { id: 'chords-m5-l1-q1', topic: 'Progressions', type: 'multiple-choice', text: 'In the key of C major, what are the I, IV, and V chords?', options: ['C, F, G', 'C, D, G', 'C, F, A', 'C, E, G'], correctAnswer: 0, explanation: 'In C major: I = C (built on 1st degree), IV = F (built on 4th degree), V = G (built on 5th degree).', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l1-q2', topic: 'Progressions', type: 'multiple-choice', text: 'The tonic chord (I) serves which harmonic function?', options: ['Rest and resolution; it is the home chord of the key', 'Tension and motion away from the key center', 'A transitional chord leading to the dominant', 'A substitute for the subdominant'], correctAnswer: 0, explanation: 'The tonic (I) provides a sense of rest, stability, and resolution. It is the home base of the key, where phrases typically begin and end.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l1-q3', topic: 'Progressions', type: 'multiple-choice', text: 'The dominant chord (V) serves which harmonic function?', options: ['Creates tension that wants to resolve to the tonic (I)', 'Provides rest and stability', 'Connects the tonic to the subdominant', 'Replaces the tonic at the end of a phrase'], correctAnswer: 0, explanation: 'The dominant (V) creates harmonic tension that strongly pulls toward resolution back to the tonic (I). This V-to-I motion is the strongest resolution in tonal music.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l1-q4', topic: 'Progressions', type: 'multiple-choice', text: 'In the key of G major, what are the I, IV, and V chords?', options: ['G, C, D', 'G, B, D', 'G, A, D', 'G, C, E'], correctAnswer: 0, explanation: 'In G major: I = G, IV = C (4th degree), V = D (5th degree).', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l1-q5', topic: 'Progressions', type: 'multiple-choice', text: 'The subdominant chord (IV) is so named because it is:', options: ['A 5th below the tonic (or a 4th above)', 'One step below the dominant', 'The dominant of the dominant', 'A substitute for the leading tone chord'], correctAnswer: 0, explanation: 'The subdominant is the note a perfect 5th below the tonic (which is the same as a perfect 4th above). F is a 5th below C and a 4th above C.', reference: 'Chord Theory Ch. 5' }
        ]
      },
      {
        id: 'chords-m5-l2',
        title: 'ii-V-I and Jazz Progressions',
        xpReward: 10,
        questions: [
          { id: 'chords-m5-l2-q1', topic: 'Progressions', type: 'multiple-choice', text: 'In the key of C major, what chords make up a ii-V-I progression?', options: ['Dm7, G7, Cmaj7', 'Em7, A7, Dmaj7', 'Fm, Bb, Eb', 'Am, D, G'], correctAnswer: 0, explanation: 'In C major: ii = Dm (or Dm7), V = G (or G7), I = C (or Cmaj7). The ii-V-I is the most fundamental jazz progression.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l2-q2', topic: 'Progressions', type: 'multiple-choice', text: 'Why is the ii-V-I progression so common in jazz?', options: ['It provides a smooth cycle of falling 5ths that strongly resolves to the tonic', 'It avoids the use of dominant chords', 'It only uses major chords for a bright sound', 'It is the simplest progression with only two chords'], correctAnswer: 0, explanation: 'The ii-V-I moves in a cycle of descending 5ths (D to G to C), which is the strongest harmonic motion in Western music. The ii chord sets up the V, and the V resolves to I.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l2-q3', topic: 'Progressions', type: 'multiple-choice', text: 'In the key of F major, what chords make up a ii-V-I progression?', options: ['Gm7, C7, Fmaj7', 'Am7, D7, Gmaj7', 'Dm7, G7, Cmaj7', 'Cm7, F7, Bbmaj7'], correctAnswer: 0, explanation: 'In F major: ii = Gm (2nd degree), V = C (5th degree), I = F (1st degree). With 7ths: Gm7, C7, Fmaj7.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l2-q4', topic: 'Progressions', type: 'multiple-choice', text: 'A turnaround progression in jazz (I-vi-ii-V) in the key of C is:', options: ['Cmaj7, Am7, Dm7, G7', 'Cmaj7, Em7, Am7, Dm7', 'Cmaj7, Fm7, Bbm7, Eb7', 'Cmaj7, Gm7, Cm7, F7'], correctAnswer: 0, explanation: 'The I-vi-ii-V turnaround in C major: Cmaj7 (I), Am7 (vi), Dm7 (ii), G7 (V). This cycles back to the I chord for the next chorus.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l2-q5', topic: 'Progressions', type: 'multiple-choice', text: 'What is a tritone substitution?', options: ['Replacing a dominant 7th chord with another dominant 7th a tritone away', 'Replacing a major chord with a diminished chord', 'Substituting any chord with a chord a half step above', 'Playing a tritone interval in place of a full chord'], correctAnswer: 0, explanation: 'A tritone substitution replaces a dominant 7th chord with another dominant 7th whose root is a tritone (6 semitones) away. For example, Db7 can replace G7 because they share the same tritone (B and F / Cb and F).', reference: 'Chord Theory Ch. 5' }
        ]
      },
      {
        id: 'chords-m5-l3',
        title: 'Cadences & Common Pop Progressions',
        xpReward: 10,
        questions: [
          { id: 'chords-m5-l3-q1', topic: 'Progressions', type: 'multiple-choice', text: 'An authentic cadence consists of which chord movement?', options: ['V to I', 'IV to I', 'I to V', 'vi to IV'], correctAnswer: 0, explanation: 'An authentic cadence (also called a perfect cadence) moves from the dominant (V) to the tonic (I). It provides the strongest sense of resolution and finality.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l3-q2', topic: 'Progressions', type: 'multiple-choice', text: 'A plagal cadence consists of which chord movement?', options: ['IV to I', 'V to I', 'I to IV', 'ii to V'], correctAnswer: 0, explanation: 'A plagal cadence moves from the subdominant (IV) to the tonic (I). It is often called the "Amen cadence" because of its use in hymns.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l3-q3', topic: 'Progressions', type: 'multiple-choice', text: 'A deceptive cadence typically moves from V to which chord?', options: ['vi (the submediant)', 'IV (the subdominant)', 'ii (the supertonic)', 'iii (the mediant)'], correctAnswer: 0, explanation: 'A deceptive cadence moves from V to vi instead of the expected I, surprising the listener. Vi shares two notes with I, making the deception smooth yet unexpected.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l3-q4', topic: 'Progressions', type: 'multiple-choice', text: 'The common pop progression I-V-vi-IV in the key of G major uses which chords?', options: ['G, D, Em, C', 'G, C, Am, F', 'G, D, Bm, A', 'G, A, Em, D'], correctAnswer: 0, explanation: 'In G major: I = G, V = D, vi = Em, IV = C. This I-V-vi-IV progression is one of the most widely used in popular music.', reference: 'Chord Theory Ch. 5' },
          { id: 'chords-m5-l3-q5', topic: 'Progressions', type: 'multiple-choice', text: 'A half cadence ends on which chord?', options: ['V (the dominant)', 'I (the tonic)', 'IV (the subdominant)', 'vi (the submediant)'], correctAnswer: 0, explanation: 'A half cadence (also called an imperfect cadence) ends on the dominant (V) chord, creating a feeling of incompleteness or a musical question that demands continuation.', reference: 'Chord Theory Ch. 5' }
        ]
      }
    ]
  }
]
