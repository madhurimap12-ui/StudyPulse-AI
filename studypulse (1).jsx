import React, { useState, useEffect } from 'react';
import { BookOpen, Zap, Target, Users, Brain, Award, Settings, Menu, X, Play, CheckCircle, AlertCircle, TrendingUp, Clock, Flame, BarChart3, Eye, Wind, Droplet, Volume2, LogOut, Home, FileText, Plus, Share2, Trophy, MessageSquare, Lightbulb, Code } from 'lucide-react';

export default function StudyPulseAI() {
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // User state
  const [user, setUser] = useState(null);
  const [moodPopup, setMoodPopup] = useState(false);
  const [morningPopup, setMorningPopup] = useState(false);
  const [reflectionPopup, setReflectionPopup] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Mock data
  const [syllabus, setSyllabus] = useState([]);
  const [topics, setTopics] = useState([]);
  const [studyPlan, setStudyPlan] = useState(null);
  const [missions, setMissions] = useState([
    { id: 1, title: 'Solve 10 hard problems today', progress: 4, total: 10, completed: false },
    { id: 2, title: 'Zero silly mistakes today', progress: 7, total: 8, completed: false },
  ]);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Daily 20-min revision', streak: 7, success: 85 },
  ]);
  const [badges, setBadges] = useState(['7-Day Streak', 'First Mock']);
  const [currentMood, setCurrentMood] = useState(null);
  const [language, setLanguage] = useState('en');
  const [slowPath, setSlowPath] = useState(false);

  // Languages
  const texts = {
    en: {
      dashboard: 'Dashboard', plan: 'Study Plan', mock: 'Mock Test', quiz: 'Fun Quiz',
      mentor: 'My Mentor', doubts: 'Ask Doubts', project: 'ProjectMentor', missions: 'Missions',
      focus: 'Focus', settings: 'Settings', logout: 'Logout',
      todaysPlan: "Today's Plan", topicHeatmap: 'Topic Heatmap', currentMission: 'Current Mission',
      nextStep: 'Next best step', startPlan: "Start today's plan", reviseMocks: 'Revise weak topics',
      timeStudied: 'Time studied today', accuracy: 'Accuracy %', streak: 'Streak days',
      strongTopics: 'Strong topics', moderateTopics: 'Moderate topics', weakTopics: 'Weak topics',
      onboarding: 'Onboarding', syllabusSync: 'SyllabusSync', morning: 'Good morning!',
      brainFresh: 'Your brain is fresh now. Great time for quantitative or hard topics.',
      startTough: 'Start a tough topic', later: 'Later',
      howFeeling: 'How are you feeling today?', lowEnergy: 'Low energy', normal: 'Normal', highFocus: 'High focus',
      endOfDay: 'End of Day Reflection', whatWentWell: 'What went well today?', whatImprove: 'What will you improve tomorrow?',
      moodOfDay: 'Mood of the day', submit: 'Submit', moodToggle: 'Mood',
      mockDetails: 'Mock Test', smartMock: 'SmartMock', calmTimer: 'CalmTimer', weakSpotAnalyzer: 'WeakSpot Analyzer',
      score: 'Score', wrongQuestions: 'Wrong Questions', mistakes: 'Mistake Analysis', challengeFriends: 'Challenge your friends',
      funBurst: 'FunBurst Quizzes', selectTopic: 'Select a topic', startQuiz: 'Start Quiz', quizComplete: 'Quiz Complete',
      friendArena: 'FriendArena', friendName: 'Your name', attemptQuiz: 'Attempt Quiz', leaderboard: 'Leaderboard',
      myMentor: 'My Mentor', mentorStyle: 'Mentor Style', strict: 'Strict', friendly: 'Friendly', neutral: 'Neutral',
      strategyModes: 'Strategy Modes', topper: 'Topper (quality over speed)', speed: 'Speed (more questions)',
      accuracy: 'Accuracy (fewer, harder questions)', cheatCode: 'CheatCode Vault', doubt: 'Doubts',
      projectMentor: 'ProjectMentor', branch: 'Branch/Interest', stage: 'Project Stage', stuck: 'Where are you stuck?',
      helpLink: 'Get Help', focusSession: 'Focus Session', timer: 'Timer', dismiss: 'Dismiss',
      wellnessReminder: 'Wellness Reminder', badgeGalaxy: 'BadgeGalaxy', unlocked: 'Unlocked Badges',
      slackToggle: 'SlowPath Mode', language: 'Language', english: 'English', hindi: 'Hindi',
      telugu: 'Telugu', tamil: 'Tamil', kannada: 'Kannada', complete: 'Complete',
    },
    hi: {
      dashboard: 'डैशबोर्ड', plan: 'अध्ययन योजना', mock: 'मॉक टेस्ट', quiz: 'मजेदार क्विज',
      mentor: 'मेरा मेंटर', doubts: 'संदेह पूछें', project: 'प्रोजेक्टमेंटर', missions: 'मिशन',
      focus: 'फोकस', settings: 'सेटिंग्स', logout: 'लॉगआउट',
    },
  };
  const t = texts[language];

  // Initialize or show popups
  useEffect(() => {
    if (user && currentPage === 'dashboard') {
      const hour = new Date().getHours();
      if (hour < 11 && !morningPopup) setMorningPopup(true);
      if (!moodPopup) setMoodPopup(true);
    }
  }, [currentPage, user]);

  // Onboarding
  const OnboardingPage = () => {
    const [formData, setFormData] = useState({
      class: '', examType: '', daysToExam: '', hoursPerDay: '', syllabusText: ''
    });

    const handleSubmit = () => {
      if (!formData.class || !formData.examType || !formData.syllabusText) {
        alert('Please fill all required fields');
        return;
      }
      const parsedTopics = formData.syllabusText.split('\n').filter(t => t.trim());
      setSyllabus(parsedTopics);
      setTopics(parsedTopics.map((t, i) => ({
        id: i, name: t.trim(), strength: ['green', 'yellow', 'red'][Math.floor(Math.random() * 3)],
      })));
      setUser({ ...formData, topics: parsedTopics });
      setCurrentPage('dashboard');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-8 h-8 text-amber-400" />
              <h1 className="text-4xl font-black bg-gradient-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">
                StudyPulse
              </h1>
            </div>
            <p className="text-indigo-200 font-light">AI-Powered Study Platform</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-indigo-500 border-opacity-20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              {t.syllabusSync}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">Class Level</label>
                <select 
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-indigo-400 border-opacity-30 focus:outline-none focus:border-amber-400 transition"
                >
                  <option value="">Select...</option>
                  <option value="class8-10">Class 8-10</option>
                  <option value="class11-12">Class 11-12</option>
                  <option value="btech">B.Tech / Degree</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">Exam Type</label>
                <select
                  value={formData.examType}
                  onChange={(e) => setFormData({...formData, examType: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-indigo-400 border-opacity-30 focus:outline-none focus:border-amber-400 transition"
                >
                  <option value="">Select...</option>
                  <option value="school">School</option>
                  <option value="boards">Boards</option>
                  <option value="neet">NEET</option>
                  <option value="jee">JEE</option>
                  <option value="eamcet">EAMCET</option>
                  <option value="btech">B.Tech</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-indigo-200 mb-2">Days to Exam</label>
                  <input
                    type="number"
                    value={formData.daysToExam}
                    onChange={(e) => setFormData({...formData, daysToExam: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-indigo-400 border-opacity-30 focus:outline-none focus:border-amber-400 transition"
                    placeholder="90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-indigo-200 mb-2">Hours/Day</label>
                  <input
                    type="number"
                    value={formData.hoursPerDay}
                    onChange={(e) => setFormData({...formData, hoursPerDay: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-indigo-400 border-opacity-30 focus:outline-none focus:border-amber-400 transition"
                    placeholder="3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">Your Syllabus (paste topics, one per line)</label>
                <textarea
                  value={formData.syllabusText}
                  onChange={(e) => setFormData({...formData, syllabusText: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-indigo-400 border-opacity-30 focus:outline-none focus:border-amber-400 transition h-32 resize-none"
                  placeholder="Algebra
Geometry
Trigonometry
Calculus"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-900 font-bold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 mt-6"
              >
                <Zap className="w-5 h-5" />
                Create My Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard
  const DashboardPage = () => {
    const todayTasks = studyPlan?.days[0]?.tasks || ['Physics - Mechanics', 'Solve 10 problems', 'Review notes'];
    
    return (
      <div className="space-y-6">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80">{t.timeStudied}</p>
                <p className="text-2xl font-bold">2h 34m</p>
              </div>
              <Clock className="w-8 h-8 opacity-60" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80">{t.accuracy}</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Target className="w-8 h-8 opacity-60" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80">{t.streak}</p>
                <p className="text-2xl font-bold">7 days</p>
              </div>
              <Flame className="w-8 h-8 opacity-60" />
            </div>
          </div>
        </div>

        {/* Today's plan */}
        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-amber-400" />
            {t.todaysPlan}
          </h3>
          <div className="space-y-2">
            {todayTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">{task}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage('plan')}
            className="w-full mt-4 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-900 font-bold py-2 rounded-lg transition"
          >
            {t.startPlan}
          </button>
        </div>

        {/* Topic Heatmap */}
        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <h3 className="text-lg font-bold text-white mb-4">{t.topicHeatmap}</h3>
          <div className="space-y-2">
            {['green', 'yellow', 'red'].map(strength => (
              <div key={strength}>
                <p className="text-xs font-semibold text-indigo-300 mb-2 capitalize">
                  {strength === 'green' ? t.strongTopics : strength === 'yellow' ? t.moderateTopics : t.weakTopics}
                </p>
                <div className="space-y-1">
                  {topics.filter(t => t.strength === strength).map(topic => (
                    <div key={topic.id} className="flex items-center gap-2 p-2 bg-slate-700 rounded">
                      <div className={`w-3 h-3 rounded-full ${
                        strength === 'green' ? 'bg-green-500' : strength === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-white text-sm">{topic.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missions */}
        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            {t.currentMission}
          </h3>
          <div className="space-y-4">
            {missions.map(mission => (
              <div key={mission.id}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white font-semibold">{mission.title}</p>
                  <span className="text-xs text-indigo-300">{mission.progress}/{mission.total}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-400 to-pink-500 h-2 rounded-full" 
                    style={{width: `${(mission.progress/mission.total)*100}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <h3 className="text-lg font-bold text-white mb-4">{t.badgeGalaxy}</h3>
          <div className="flex flex-wrap gap-3">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Study Plan (Route7 Planner + SyllabusFlow)
  const StudyPlanPage = () => {
    if (!studyPlan) {
      const generatePlan = () => {
        const daysCount = parseInt(user?.daysToExam) || 7;
        const days = [];
        for (let i = 0; i < Math.min(7, daysCount); i++) {
          days.push({
            day: i + 1,
            dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
            topics: topics.slice(i, i + 2),
            tasks: [`Solve ${10 + i * 2} problems`, '1 mini test', '1 fun quiz'],
            timeBlocks: ['09:00-10:30', '14:00-15:30', '19:00-20:00']
          });
        }
        setStudyPlan({ days });
      };
      
      if (!studyPlan && user) generatePlan();
    }

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{t.plan}</h2>
          <p className="text-indigo-100">7-day adaptive study schedule tailored to your pace</p>
        </div>

        {studyPlan?.days.map(day => (
          <div key={day.day} className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Day {day.day} - {day.dayName}</h3>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition">
                Adjust
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-indigo-300 mb-2">Topics</p>
                <div className="space-y-2">
                  {day.topics.map(topic => (
                    <div key={topic.id} className="px-3 py-2 bg-slate-700 rounded text-white text-sm">
                      {topic.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300 mb-2">Time Blocks (SyllabusFlow)</p>
                <div className="space-y-2">
                  {day.timeBlocks.map((time, i) => (
                    <div key={i} className="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded text-white text-sm">
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-indigo-300 mb-2">Daily Tasks</p>
              <div className="space-y-1">
                {day.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          No time today - Redistribute tasks
        </button>
      </div>
    );
  };

  // Mock Test
  const MockTestPage = () => {
    const [mockActive, setMockActive] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [takingBreak, setTakingBreak] = useState(false);

    const mockQuestions = [
      { id: 1, q: 'What is the SI unit of force?', options: ['Newton', 'Joule', 'Pascal', 'Watt'], correct: 0, difficulty: 'Easy', topic: 'Physics' },
      { id: 2, q: 'Calculate: 15² - 8²', options: ['161', '161', '170', '150'], correct: 0, difficulty: 'Medium', topic: 'Math' },
      { id: 3, q: 'Which of these is a redox reaction?', options: ['H2SO4 + NaOH → Na2SO4 + H2O', 'Cl2 + 2NaBr → 2NaCl + Br2', 'AgNO3 + NaCl → AgCl↓ + NaNO3', 'All of the above'], correct: 1, difficulty: 'Hard', topic: 'Chemistry' },
    ];

    if (!mockActive) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{t.mock}</h2>
            <p className="text-purple-100">NEET Biology Sample - 3 Questions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
              <Brain className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-bold mb-2">SmartMock</h3>
              <p className="text-indigo-300 text-sm">Adaptive difficulty based on your answers</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
              <Wind className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-white font-bold mb-2">CalmTimer</h3>
              <p className="text-indigo-300 text-sm">Stress-detection & breathing breaks</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
              <TrendingUp className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-white font-bold mb-2">WeakSpot Analyzer</h3>
              <p className="text-indigo-300 text-sm">Detailed performance insights</p>
            </div>
          </div>

          <button
            onClick={() => setMockActive(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Mock Test
          </button>
        </div>
      );
    }

    const q = mockQuestions[currentQ];
    
    return (
      <div className="space-y-6">
        <div className="bg-slate-800 rounded-xl p-4 border border-indigo-500 border-opacity-20 flex justify-between items-center">
          <span className="text-white font-semibold">Question {currentQ + 1} / {mockQuestions.length}</span>
          <div className="w-32 bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
              style={{width: `${((currentQ + 1) / mockQuestions.length) * 100}%`}} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg flex-1">{q.q}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              q.difficulty === 'Easy' ? 'bg-green-600 text-green-100' :
              q.difficulty === 'Medium' ? 'bg-yellow-600 text-yellow-100' :
              'bg-red-600 text-red-100'
            }`}>
              {q.difficulty}
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  setAnswers([...answers, i]);
                  setTimeout(() => {
                    if (currentQ < mockQuestions.length - 1) setCurrentQ(currentQ + 1);
                    else setMockActive('results');
                  }, 300);
                }}
                className={`w-full p-4 rounded-lg text-left border-2 transition ${
                  answers[currentQ] === i
                    ? 'border-green-500 bg-green-900 text-green-100'
                    : 'border-slate-600 bg-slate-700 text-white hover:border-indigo-500'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
            >
              💡 Hint
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
            >
              ✓ Solution
            </button>
          </div>

          {showHint && <div className="mt-4 p-4 bg-blue-900 text-blue-100 rounded-lg text-sm">💡 Think about the fundamental definitions</div>}
          {showSolution && <div className="mt-4 p-4 bg-green-900 text-green-100 rounded-lg text-sm">✓ The answer is {q.options[q.correct]}. Here's why: [Detailed explanation would go here]</div>}
        </div>

        {takingBreak && (
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4">Take a breathing break</h3>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full animate-pulse flex items-center justify-center">
                <Wind className="w-16 h-16 text-cyan-600" />
              </div>
            </div>
            <p className="text-center mt-4 text-sm opacity-90">Breathe in for 4, hold for 4, exhale for 4...</p>
            <button
              onClick={() => setTakingBreak(false)}
              className="w-full mt-4 bg-white text-cyan-700 font-bold py-2 rounded-lg"
            >
              Back to Test
            </button>
          </div>
        )}
      </div>
    );
  };

  // Fun Quiz
  const FunQuizPage = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [quizActive, setQuizActive] = useState(false);
    const [quizScore, setQuizScore] = useState(null);
    const [friendLink, setFriendLink] = useState(null);

    const quizQuestions = {
      'Physics': [
        { q: 'Speed of light?', opts: ['3×10⁸ m/s', '2×10⁸ m/s'], correct: 0 },
        { q: 'Newton 1st law name?', opts: ['Inertia', 'Motion'], correct: 0 },
        { q: 'SI unit of charge?', opts: ['Coulomb', 'Volt'], correct: 0 },
        { q: 'Gravity constant symbol?', opts: ['G', 'g'], correct: 0 },
        { q: 'Planck constant in eV·s?', opts: ['4.136×10⁻¹⁵', '6.626×10⁻³⁴'], correct: 0 },
      ]
    };

    if (!selectedTopic) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{t.funBurst}</h2>
            <p className="text-yellow-100">5-question quiz, 5 minutes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {['Physics', 'Chemistry', 'Biology', 'Math'].map(topic => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  setQuizActive(true);
                }}
                className="p-6 bg-slate-800 rounded-xl border border-indigo-500 border-opacity-20 hover:border-amber-400 hover:border-opacity-50 transition text-white text-center font-bold"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (quizScore !== null) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-4xl font-black mb-2">{quizScore.score}/5</p>
            <p className="text-green-100">Finished in {quizScore.time}s</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
            <h3 className="text-white font-bold mb-4">Challenge your friends</h3>
            <p className="text-indigo-300 text-sm mb-4">Share this link to compare scores:</p>
            <div className="bg-slate-700 rounded-lg p-3 text-white font-mono text-sm break-all">
              studypulse.app/quiz/xyz123{Math.random().toString(36).slice(7)}
            </div>
            <button
              onClick={() => setFriendLink(true)}
              className="w-full mt-4 bg-gradient-to-r from-amber-400 to-pink-500 text-slate-900 font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Link
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedTopic(null);
              setQuizScore(null);
              setFriendLink(null);
            }}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition"
          >
            Try Another Topic
          </button>
        </div>
      );
    }

    if (quizActive && selectedTopic) {
      return (
        <div className="space-y-4">
          <button
            onClick={() => setQuizActive(false)}
            className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1"
          >
            ← Back
          </button>

          {quizQuestions[selectedTopic]?.slice(0, 1).map((q, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
              <h3 className="text-white font-bold mb-4">{q.q}</h3>
              {q.opts.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuizScore({ score: 4, time: Math.floor(Math.random() * 120) + 60 });
                  }}
                  className="w-full p-3 mb-3 bg-slate-700 hover:bg-indigo-600 text-white rounded-lg transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  // Mentor Page
  const MentorPage = () => {
    const [mentorStyle, setMentorStyle] = useState('friendly');

    const mentorMessages = {
      friendly: [
        '🌟 You\'ve solved 15 problems today! Keep that momentum going!',
        '💪 Physics concepts are tough, but you\'re getting there. Take a 5-min break?',
        '🎯 Your accuracy jumped to 91%. You\'re becoming a problem-solving pro!',
      ],
      strict: [
        '⚠️ 2h 15m studied. Target is 3h daily. Need a focus boost?',
        '❌ Weak in Organic Chemistry. Allocate 3h tomorrow for this.',
        '✅ Mock score: 287/300. Review the 4 mistakes—don\'t repeat them.',
      ],
      neutral: [
        '📊 Current stats: 2.5h studied, 87% accuracy, 7-day streak.',
        '🎯 Next task: Chemistry - Organic Reactions. Estimated time: 45 minutes.',
        '📈 Performance trend: +3% improvement in Math over the last week.',
      ],
    };

    const strategies = [
      { id: 'topper', name: 'Topper (Quality)', desc: 'Fewer questions, focus on understanding. 5 Q/day.' },
      { id: 'speed', name: 'Speed Mode', desc: 'More questions, timed practice. 25 Q/day.' },
      { id: 'accuracy', name: 'Accuracy First', desc: 'Hard concepts only, deep dive. 8 Q/day.' },
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{t.myMentor}</h2>
          <p className="text-indigo-100">AI-powered mentorship personalized to your style</p>
        </div>

        {/* Mentor style selector */}
        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <h3 className="text-white font-bold mb-4">{t.mentorStyle}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'strict', label: t.strict, icon: '🔥' },
              { id: 'friendly', label: t.friendly, icon: '🌟' },
              { id: 'neutral', label: t.neutral, icon: '📊' },
            ].map(style => (
              <button
                key={style.id}
                onClick={() => setMentorStyle(style.id)}
                className={`p-4 rounded-lg transition border-2 ${
                  mentorStyle === style.id
                    ? 'border-amber-400 bg-slate-700'
                    : 'border-slate-600 bg-slate-700 hover:border-indigo-500'
                }`}
              >
                <div className="text-2xl mb-2">{style.icon}</div>
                <p className="text-white font-semibold text-sm">{style.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Mentor messages */}
        <div className="space-y-3">
          {mentorMessages[mentorStyle]?.map((msg, i) => (
            <div key={i} className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 border-l-4 border-amber-400">
              <p className="text-white">{msg}</p>
            </div>
          ))}
        </div>

        {/* Strategy modes */}
        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <h3 className="text-white font-bold mb-4">{t.strategyModes}</h3>
          <div className="space-y-3">
            {strategies.map(strat => (
              <button
                key={strat.id}
                className="w-full p-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition border border-slate-600"
              >
                <p className="text-white font-bold">{strat.name}</p>
                <p className="text-indigo-300 text-sm mt-1">{strat.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* CheatCode Vault */}
        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <h3 className="text-white font-bold mb-4">{t.cheatCode}</h3>
          <div className="space-y-3">
            {[
              '⭐ High-weight topics first (70% of exam)',
              '📅 Last-day mini plan: revision only',
              '🧠 Active recall > passive reading',
              '😴 Sleep 7-8h before exam',
              '⏱️ 5-min breaks every 45 minutes',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-700 rounded-lg">
                <span className="text-white text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Doubts Page
  const DoubtsPage = () => {
    const [doubtText, setDoubtText] = useState('');
    const [answer, setAnswer] = useState(null);

    const mockAnswer = {
      steps: [
        'Step 1: Identify the given values (mass, velocity, time)',
        'Step 2: Use the formula F = ma (Newton\'s 2nd law)',
        'Step 3: Substitute values',
        'Step 4: Solve for the unknown',
      ],
      bullet: '• Force = mass × acceleration\n• SI unit: Newton (N)\n• Vector quantity (has direction)',
      example: 'A 5 kg object accelerates at 2 m/s². Force = 5 × 2 = 10 N',
      concept: 'The force acting on an object equals its mass multiplied by its acceleration.',
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{t.doubt}</h2>
          <p className="text-pink-100">Ask any question, get instant AI-powered explanations</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
          <textarea
            value={doubtText}
            onChange={(e) => setDoubtText(e.target.value)}
            placeholder="Ask your doubt here..."
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-indigo-400 border-opacity-30 focus:outline-none focus:border-amber-400 transition h-24 resize-none"
          />
          <button
            onClick={() => setAnswer(mockAnswer)}
            className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold py-2 rounded-lg transition"
          >
            Get Explanation
          </button>
        </div>

        {answer && (
          <div className="bg-slate-800 rounded-xl p-6 border border-indigo-500 border-opacity-20">
            <h3 className="text-white font-bold mb-4">Your Answer</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-indigo-300 font-semibold text-sm mb-2">Step-by-Step:</p>
                <div className="space-y-2">
                  {answer.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-slate-700 rounded text-white text-sm">
                      <span className="font-bold text-amber-400">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-indigo-300 font-semibold text-sm mb-2">Key Points:</p>
                <div className="p-3 bg-slate-700 rounded text-white text-sm whitespace-pre-line">{answer.bullet}</div>
              </div>

              <div>
                <p className="text-indigo-300 font-semibold text-sm mb-2">Real-Life Example:</p>
                <div className="p-3 bg-slate-700 rounded text-white text-sm">{answer.example}</div>
              </div>

              <div>
                <p className="text-indigo-300 font-semibold text-sm mb-2">Core Concept:</p>
                <div className="p-3 bg-slate-700 rounded text-white text-sm">{answer.concept}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Focus Mode
  const FocusModeComponent = () => {
    const [timeLeft, setTimeLeft] = useState(1500);

    useEffect(() => {
      if (!focusMode) return;
      const interval = setInterval(() => {
        setTimeLeft(t => t > 0 ? t - 1 : 0);
      }, 1000);
      return () => clearInterval(interval);
    }, [focusMode]);

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 relative">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-8 font-mono">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </h1>
          
          <p className="text-2xl text-amber-300 mb-8">Focus Mode Active</p>
          
          <div className="bg-slate-800 rounded-xl p-8 border border-indigo-500 border-opacity-30 max-w-sm mb-8">
            <p className="text-indigo-300 mb-6">Wellness Reminder</p>
            <p className="text-white text-lg font-semibold">
              {['Take a sip of water', 'Straighten your back', 'Look away for 20 seconds', 'Breathe deeply'][Math.floor(Math.random() * 4)]}
            </p>
          </div>

          <button
            onClick={() => setFocusMode(false)}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            End Focus Session
          </button>
        </div>
      </div>
    );
  };

  // Popups
  const MoodPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm border border-indigo-500 border-opacity-30">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{t.howFeeling}</h2>
        <div className="space-y-3">
          {[
            { id: 'low', label: t.lowEnergy, emoji: '😔' },
            { id: 'normal', label: t.normal, emoji: '😊' },
            { id: 'high', label: t.highFocus, emoji: '🔥' },
          ].map(mood => (
            <button
              key={mood.id}
              onClick={() => {
                setCurrentMood(mood.id);
                setMoodPopup(false);
              }}
              className="w-full p-4 bg-slate-700 hover:bg-indigo-600 rounded-lg text-white transition flex items-center gap-3 font-semibold"
            >
              <span className="text-3xl">{mood.emoji}</span>
              {mood.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const MorningPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm border border-indigo-500 border-opacity-30">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          {t.morning}
        </h2>
        <p className="text-indigo-200 mb-6">{t.brainFresh}</p>
        <div className="space-y-3">
          <button
            onClick={() => {
              setMorningPopup(false);
              setCurrentPage('mock');
            }}
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-900 font-bold py-3 rounded-lg transition"
          >
            {t.startTough}
          </button>
          <button
            onClick={() => setMorningPopup(false)}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
          >
            {t.later}
          </button>
        </div>
      </div>
    </div>
  );

  // Main navigation
  const Navigation = () => (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-indigo-500 border-opacity-20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">
              StudyPulse
            </h1>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { id: 'dashboard', label: t.dashboard, icon: Home },
              { id: 'plan', label: t.plan, icon: FileText },
              { id: 'mock', label: t.mock, icon: Brain },
              { id: 'quiz', label: t.quiz, icon: Play },
              { id: 'mentor', label: t.mentor, icon: Lightbulb },
              { id: 'doubts', label: t.doubt, icon: MessageSquare },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg transition flex items-center gap-2 font-semibold text-sm ${
                    currentPage === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button + controls */}
          <div className="flex items-center gap-4">
            {/* Language selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="hidden sm:block px-3 py-2 bg-slate-700 text-white text-sm rounded-lg border border-indigo-400 border-opacity-30"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
            </select>

            {/* Focus button */}
            <button
              onClick={() => setFocusMode(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg transition font-semibold text-sm"
            >
              <Zap className="w-4 h-4" />
              Focus
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-indigo-300 hover:bg-slate-700 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {[
              { id: 'dashboard', label: t.dashboard },
              { id: 'plan', label: t.plan },
              { id: 'mock', label: t.mock },
              { id: 'quiz', label: t.quiz },
              { id: 'mentor', label: t.mentor },
              { id: 'doubts', label: t.doubt },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition font-semibold ${
                  currentPage === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-indigo-300 hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  if (focusMode) return <FocusModeComponent />;
  if (!user) return <OnboardingPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <Navigation />

      {/* Popups */}
      {moodPopup && <MoodPopup />}
      {morningPopup && <MorningPopup />}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'plan' && <StudyPlanPage />}
        {currentPage === 'mock' && <MockTestPage />}
        {currentPage === 'quiz' && <FunQuizPage />}
        {currentPage === 'mentor' && <MentorPage />}
        {currentPage === 'doubts' && <DoubtsPage />}
      </main>
    </div>
  );
}