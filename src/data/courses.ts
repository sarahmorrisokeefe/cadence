import type { Course } from '../types'
import { fundamentalsModules } from './fundamentals'
import { chordModules } from './chords'
import { scaleModules } from './scales'
import { earTrainingModules } from './earTraining'

export const COURSES: Course[] = [
  {
    id: 'fundamentals',
    title: 'Music Fundamentals',
    shortTitle: 'Fundamentals',
    description: 'Notes, rhythm, intervals, key signatures & basic harmony',
    icon: '🎓',
    color: 'bg-emerald-500',
    bgGradient: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    modules: fundamentalsModules,
    testConfig: {
      questionCount: 60,
      timeLimit: 150,
      passingScore: 70,
    },
  },
  {
    id: 'chords',
    title: 'Chord Theory',
    shortTitle: 'Chords',
    description: 'Triads, seventh chords, inversions & chord progressions',
    icon: '🎹',
    color: 'bg-sky-500',
    bgGradient: 'bg-gradient-to-r from-sky-500 to-blue-600',
    modules: chordModules,
    testConfig: {
      questionCount: 60,
      timeLimit: 150,
      passingScore: 70,
    },
  },
  {
    id: 'scales',
    title: 'Scales & Modes',
    shortTitle: 'Scales',
    description: 'Major, minor, modes, pentatonic & blues scales',
    icon: '🎸',
    color: 'bg-violet-500',
    bgGradient: 'bg-gradient-to-r from-violet-500 to-purple-700',
    modules: scaleModules,
    testConfig: {
      questionCount: 60,
      timeLimit: 180,
      passingScore: 70,
    },
  },
  {
    id: 'ear-training',
    title: 'Ear Training',
    shortTitle: 'Ear Training',
    description: 'Interval recognition, chord quality, rhythm & melody',
    icon: '👂',
    color: 'bg-amber-500',
    bgGradient: 'bg-gradient-to-r from-amber-500 to-orange-600',
    modules: earTrainingModules,
    testConfig: {
      questionCount: 60,
      timeLimit: 180,
      passingScore: 70,
    },
  },
]

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}
