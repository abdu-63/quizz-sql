// ============================================================
// app.js — SQL Master : Logique métier
// Quiz QCM, Quiz Écrit, Évaluations, Révision, Flashcards
// ============================================================

(function () {
  'use strict';

  // ── State ─────────────────────────────────────────────────
  const state = {
    currentView: 'home',
    // Quiz QCM
    quizMode: 'normal',
    quizQuestions: [],
    currentQuestionIndex: 0,
    selectedCount: 20,
    correctCount: 0,
    wrongCount: 0,
    answered: false,
    // Written Quiz
    wqMode: 'normal',
    wqQuestions: [],
    wqCurrentIndex: 0,
    wqSelectedCount: 20,
    wqCorrectCount: 0,
    wqWrongCount: 0,
    wqChecked: false,
    wqEvaluated: false,
    // Exams
    currentExam: null,
    examQuestions: [],
    examCurrentIndex: 0,
    examCorrectCount: 0,
    examWrongCount: 0,
    examChecked: false,
    examEvaluated: false,
    // Flashcards
    currentFlashcardIndex: 0,
    fcMode: 'normal',
    fcCards: [],
    fcCorrectCount: 0,
    fcWrongCount: 0,
    fcEvaluated: false,
  };

  // ── LocalStorage ──────────────────────────────────────────
  const STORAGE_KEYS = {
    reviewList: 'sqlmaster_review_list',
    writtenReviewList: 'sqlmaster_written_review_list',
    fcFailedList: 'sqlmaster_fc_failed_list',
    stats: 'sqlmaster_stats',
    customFlashcards: 'sqlmaster_custom_flashcards',
  };

  function getList(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  }
  function setList(key, list) { localStorage.setItem(key, JSON.stringify(list)); }
  function getReviewList() { return getList(STORAGE_KEYS.reviewList); }
  function setReviewList(l) { setList(STORAGE_KEYS.reviewList, l); }
  function getWrittenReviewList() { return getList(STORAGE_KEYS.writtenReviewList); }
  function setWrittenReviewList(l) { setList(STORAGE_KEYS.writtenReviewList, l); }
  function getFcFailedList() { return getList(STORAGE_KEYS.fcFailedList); }
  function setFcFailedList(l) { setList(STORAGE_KEYS.fcFailedList, l); }
  function getStats() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.stats)) || { totalAnswered: 0, totalCorrect: 0 }; }
    catch { return { totalAnswered: 0, totalCorrect: 0 }; }
  }
  function setStats(s) { localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(s)); }
  function getCustomFlashcards() { return getList(STORAGE_KEYS.customFlashcards); }
  function setCustomFlashcards(l) { setList(STORAGE_KEYS.customFlashcards, l); }
  /** Merge built-in + custom cards, custom ones get id prefix 'c_' */
  function getAllFlashcards() {
    const custom = getCustomFlashcards().map((c, i) => ({
      ...c, id: 'c_' + (c.id || i), _custom: true
    }));
    return [...FLASHCARDS, ...custom];
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── DOM ───────────────────────────────────────────────────
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const els = {
    viewHome: $('#view-home'),
    viewQuiz: $('#view-quiz'),
    viewWritten: $('#view-written'),
    viewExams: $('#view-exams'),
    viewFlashcards: $('#view-flashcards'),
    navBtns: $$('.nav-btn[data-view]'),
    statScoreValue: $('#stat-score-value'),
    statReviewValue: $('#stat-review-value'),
    navBrand: $('.nav-brand'),

    // Home
    quizCountOptions: $$('#quiz-count-options .config-btn'),
    btnStartQuiz: $('#btn-start-quiz'),
    btnStartRevision: $('#btn-start-revision'),
    revisionNumber: $('#revision-number'),
    writtenCountOptions: $$('#written-count-options .config-btn'),
    btnStartWritten: $('#btn-start-written'),
    btnStartWrittenRevision: $('#btn-start-written-revision'),
    writtenRevisionNumber: $('#written-revision-number'),
    flashcardNumber: $('#flashcard-number'),
    btnStartFlashcards: $('#btn-start-flashcards'),
    btnStartFcRevision: $('#btn-start-fc-revision'),
    fcFailedNumber: $('#fc-failed-number'),
    examListHome: $('#exam-list-home'),
    btnGotoExams: $('#btn-goto-exams'),

    // Backup
    btnExportData: $('#btn-export-data'),
    btnImportData: $('#btn-import-data'),
    backupFileInput: $('#backup-file-input'),

    // Quiz QCM
    quizContainer: $('#view-quiz .quiz-container'),
    quizResults: $('#quiz-results'),
    progressBar: $('#quiz-progress-bar'),
    progressText: $('#quiz-progress-text'),
    quizCategory: $('#quiz-category'),
    quizDifficulty: $('#quiz-difficulty'),
    quizQuestionText: $('#quiz-question-text'),
    quizOptions: $('#quiz-options'),
    quizExplanation: $('#quiz-explanation'),
    explanationIcon: $('#explanation-icon'),
    explanationTitle: $('#explanation-title'),
    explanationText: $('#explanation-text'),
    btnNextQuestion: $('#btn-next-question'),
    resultsIcon: $('#results-icon'),
    resultsTitle: $('#results-title'),
    scoreFill: $('#score-fill'),
    scoreText: $('#score-text'),
    resultsCorrect: $('#results-correct'),
    resultsWrong: $('#results-wrong'),
    btnResultsHome: $('#btn-results-home'),
    btnResultsRetry: $('#btn-results-retry'),
    btnQuizPrev: $('#btn-quiz-prev'),

    // Written Quiz
    wqContainer: $('#view-written .quiz-container'),
    wqResults: $('#wq-results'),
    wqProgressBar: $('#wq-progress-bar'),
    wqProgressText: $('#wq-progress-text'),
    wqCategory: $('#wq-category'),
    wqDifficulty: $('#wq-difficulty'),
    wqQuestionText: $('#wq-question-text'),
    wqAnswerArea: $('#wq-answer-area'),
    wqInput: $('#wq-input'),
    btnWqCheck: $('#btn-wq-check'),
    wqCorrection: $('#wq-correction'),
    wqUserAnswer: $('#wq-user-answer'),
    wqCorrectAnswer: $('#wq-correct-answer'),
    btnWqCorrect: $('#btn-wq-correct'),
    btnWqWrong: $('#btn-wq-wrong'),
    wqResultsIcon: $('#wq-results-icon'),
    wqResultsTitle: $('#wq-results-title'),
    wqScoreFill: $('#wq-score-fill'),
    wqScoreText: $('#wq-score-text'),
    wqResultsCorrect: $('#wq-results-correct'),
    wqResultsWrong: $('#wq-results-wrong'),
    btnWqResultsHome: $('#btn-wq-results-home'),
    btnWqResultsRetry: $('#btn-wq-results-retry'),
    btnWqPrev: $('#btn-wq-prev'),
    // Annexe
    wqAnnexeSection: $('#wq-annexe-section'),
    annexeToggle: $('#annexe-toggle'),

    // Exams
    examSelection: $('#exam-selection'),
    examCards: $('#exam-cards'),
    examContainer: $('#exam-container'),
    examResults: $('#exam-results'),
    btnBackExams: $('#btn-back-exams'),
    examBadge: $('#exam-badge'),
    examTimer: $('#exam-timer'),
    examProgressBar: $('#exam-progress-bar'),
    examProgressText: $('#exam-progress-text'),
    examPoints: $('#exam-points'),
    examQuestionText: $('#exam-question-text'),
    examAnswerArea: $('#exam-answer-area'),
    examInput: $('#exam-input'),
    btnExamCheck: $('#btn-exam-check'),
    examCorrection: $('#exam-correction'),
    examUserAnswer: $('#exam-user-answer'),
    examCorrectAnswer: $('#exam-correct-answer'),
    btnExamCorrect: $('#btn-exam-correct'),
    btnExamWrong: $('#btn-exam-wrong'),
    examAnnexeSection: $('#exam-annexe-section'),
    examAnnexeToggle: $('#exam-annexe-toggle'),
    examResultsIcon: $('#exam-results-icon'),
    examResultsTitle: $('#exam-results-title'),
    examScoreFill: $('#exam-score-fill'),
    examScoreText: $('#exam-score-text'),
    examResultsCorrect: $('#exam-results-correct'),
    examResultsWrong: $('#exam-results-wrong'),
    btnExamResultsHome: $('#btn-exam-results-home'),
    btnExamResultsBack: $('#btn-exam-results-back'),
    btnExamPrev: $('#btn-exam-prev'),

    // Flashcards
    fcTitle: $('#fc-title'),
    flashcard: $('#flashcard'),
    fcFrontContent: $('#fc-front-content'),
    fcBackContent: $('#fc-back-content'),
    fcCounter: $('#fc-counter'),
    fcCategory: $('#fc-category'),
    fcDifficulty: $('#fc-difficulty'),
    fcPrev: $('#fc-prev'),
    fcNext: $('#fc-next'),
    fcEvalBar: $('#fc-eval-bar'),
    btnFcCorrect: $('#btn-fc-correct'),
    btnFcWrong: $('#btn-fc-wrong'),
    fcResultsPanel: $('#fc-results'),
    fcResultsCorrect: $('#fc-results-correct'),
    fcResultsWrong: $('#fc-results-wrong'),
    fcResultsIcon: $('#fc-results-icon'),
    fcResultsTitle: $('#fc-results-title'),
    btnFcResultsHome: $('#btn-fc-results-home'),
    flashcardsContainer: $('.flashcards-container'),

    bgParticles: $('#bg-particles'),

    // Burger menu
    burgerBtn: $('#burger-btn'),
    navLinks: $('#nav-links'),
    drawerOverlay: $('#drawer-overlay'),

    // CSV Import Modal
    csvModal: $('#csv-modal'),
    modalClose: $('#modal-close'),
    modalCancel: $('#modal-cancel'),
    btnImportConfirm: $('#btn-import-confirm'),
    csvDropzone: $('#csv-dropzone'),
    csvFileInput: $('#csv-file-input'),
    csvResult: $('#csv-result'),
    csvCustomInfo: $('#csv-custom-info'),
    customFcCount: $('#custom-fc-count'),
    btnDeleteCustom: $('#btn-delete-custom'),
    btnImportCsvHome: $('#btn-import-csv-home'),
    btnImportCsvFc: $('#btn-import-csv-fc'),
  };

  // ── Init ──────────────────────────────────────────────────
  function init() {
    injectSVGDefs();
    createParticles();
    bindEvents();
    updateNavStats();
    updateHomeStats();
    populateExamListHome();
  }

  function injectSVGDefs() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.innerHTML = `<defs><linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs>`;
    document.body.appendChild(svg);
  }

  function createParticles() {
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (Math.random() * 20 + 15) + 's';
      p.style.animationDelay = (Math.random() * 20) + 's';
      els.bgParticles.appendChild(p);
    }
  }

  // ── Events ────────────────────────────────────────────────
  function bindEvents() {
    // Burger menu
    els.burgerBtn.addEventListener('click', toggleDrawer);
    els.drawerOverlay.addEventListener('click', closeDrawer);

    // Nav
    els.navBrand.addEventListener('click', () => {
      closeDrawer();
      navigateTo('home');
    });

    els.navBtns.forEach((b) => b.addEventListener('click', () => {
      closeDrawer();
      const view = b.dataset.view;

      if (view === 'quiz' && state.quizQuestions.length === 0) {
        navigateTo('home');
        alert("Veuillez d'abord choisir vos options et lancer le Quiz QCM depuis l'accueil (1ère fois uniquement).");
        els.btnStartQuiz.scrollIntoView({ behavior: 'smooth', block: 'center' });
        els.btnStartQuiz.style.boxShadow = '0 0 0 4px var(--accent-blue)';
        setTimeout(() => els.btnStartQuiz.style.boxShadow = '', 1500);
        return;
      }
      if (view === 'written' && state.wqQuestions.length === 0) {
        navigateTo('home');
        alert("Veuillez d'abord lancer le Quiz Écrit depuis l'accueil (1ère fois uniquement).");
        els.btnStartWritten.scrollIntoView({ behavior: 'smooth', block: 'center' });
        els.btnStartWritten.style.boxShadow = '0 0 0 4px var(--accent-orange)';
        setTimeout(() => els.btnStartWritten.style.boxShadow = '', 1500);
        return;
      }
      if (view === 'flashcards' && state.fcCards.length === 0) {
        navigateTo('home');
        alert("Veuillez d'abord lancer les Flashcards depuis l'accueil (1ère fois uniquement).");
        els.btnStartFlashcards.scrollIntoView({ behavior: 'smooth', block: 'center' });
        els.btnStartFlashcards.style.boxShadow = '0 0 0 4px var(--accent-blue)';
        setTimeout(() => els.btnStartFlashcards.style.boxShadow = '', 1500);
        return;
      }

      if (view === 'exams') { navigateTo('exams'); showExamSelection(); }
      else navigateTo(view);
    }));

    // CSV Import
    els.btnImportCsvHome.addEventListener('click', openCsvModal);
    els.btnImportCsvFc.addEventListener('click', openCsvModal);
    els.modalClose.addEventListener('click', closeCsvModal);
    els.modalCancel.addEventListener('click', closeCsvModal);
    els.csvModal.addEventListener('click', (e) => { if (e.target === els.csvModal) closeCsvModal(); });
    els.btnImportConfirm.addEventListener('click', confirmImport);
    els.btnDeleteCustom.addEventListener('click', deleteCustomCards);
    els.csvFileInput.addEventListener('change', (e) => handleCsvFile(e.target.files[0]));
    els.csvDropzone.addEventListener('dragover', (e) => { e.preventDefault(); els.csvDropzone.classList.add('drag-over'); });
    els.csvDropzone.addEventListener('dragleave', () => els.csvDropzone.classList.remove('drag-over'));
    els.csvDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      els.csvDropzone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) handleCsvFile(file);
    });

    // Backup
    els.btnExportData.addEventListener('click', exportBackup);
    els.btnImportData.addEventListener('click', () => els.backupFileInput.click());
    els.backupFileInput.addEventListener('change', (e) => importBackup(e.target.files[0]));

    // QCM count
    els.quizCountOptions.forEach((b) => b.addEventListener('click', () => {
      els.quizCountOptions.forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      state.selectedCount = b.dataset.count === 'all' ? 'all' : parseInt(b.dataset.count);
    }));

    // Written count
    els.writtenCountOptions.forEach((b) => b.addEventListener('click', () => {
      els.writtenCountOptions.forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      state.wqSelectedCount = b.dataset.count === 'all' ? 'all' : parseInt(b.dataset.count);
    }));

    // Start buttons
    els.btnStartQuiz.addEventListener('click', () => startQuiz('normal'));
    els.btnStartRevision.addEventListener('click', () => startQuiz('revision'));
    els.btnStartWritten.addEventListener('click', () => startWrittenQuiz('normal'));
    els.btnStartWrittenRevision.addEventListener('click', () => startWrittenQuiz('revision'));
    els.btnStartFlashcards.addEventListener('click', () => startFlashcards('normal'));
    els.btnStartFcRevision.addEventListener('click', () => startFlashcards('revision'));
    els.btnGotoExams.addEventListener('click', () => { navigateTo('exams'); showExamSelection(); });

    // QCM
    els.btnNextQuestion.addEventListener('click', nextQuestion);
    els.btnResultsHome.addEventListener('click', () => navigateTo('home'));
    els.btnResultsRetry.addEventListener('click', () => startQuiz('revision'));
    els.btnQuizPrev.addEventListener('click', prevQuestion);

    // Written
    els.btnWqCheck.addEventListener('click', checkWrittenAnswer);
    els.btnWqCorrect.addEventListener('click', () => evaluateWritten(true));
    els.btnWqWrong.addEventListener('click', () => evaluateWritten(false));
    els.btnWqResultsHome.addEventListener('click', () => navigateTo('home'));
    els.btnWqResultsRetry.addEventListener('click', () => startWrittenQuiz('revision'));
    els.btnWqPrev.addEventListener('click', prevWrittenQuestion);

    // Annexe toggle (written quiz)
    els.annexeToggle.addEventListener('click', () => {
      els.wqAnnexeSection.classList.toggle('open');
    });

    // Exam
    els.btnBackExams.addEventListener('click', showExamSelection);
    els.btnExamCheck.addEventListener('click', checkExamAnswer);
    els.btnExamCorrect.addEventListener('click', () => evaluateExam(true));
    els.btnExamWrong.addEventListener('click', () => evaluateExam(false));
    els.btnExamResultsHome.addEventListener('click', () => navigateTo('home'));
    els.btnExamResultsBack.addEventListener('click', showExamSelection);
    els.examAnnexeToggle.addEventListener('click', () => {
      els.examAnnexeSection.classList.toggle('open');
    });
    els.btnExamPrev.addEventListener('click', prevExamQuestion);

    // Flashcards
    els.flashcard.addEventListener('click', () => els.flashcard.classList.toggle('flipped'));
    els.fcPrev.addEventListener('click', () => changeFlashcard(-1));
    els.fcNext.addEventListener('click', () => changeFlashcard(1));
    els.btnFcCorrect.addEventListener('click', () => evaluateFlashcard(true));
    els.btnFcWrong.addEventListener('click', () => evaluateFlashcard(false));
    els.btnFcResultsHome.addEventListener('click', () => navigateTo('home'));

    document.addEventListener('keydown', handleKeyboard);
  }

  // ── Burger / Drawer ───────────────────────────────────────
  function toggleDrawer() {
    const isOpen = els.navLinks.classList.contains('drawer-open');
    isOpen ? closeDrawer() : openDrawer();
  }

  function openDrawer() {
    els.navLinks.classList.add('drawer-open');
    els.burgerBtn.classList.add('open');
    els.burgerBtn.setAttribute('aria-expanded', 'true');
    els.drawerOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    els.navLinks.classList.remove('drawer-open');
    els.burgerBtn.classList.remove('open');
    els.burgerBtn.setAttribute('aria-expanded', 'false');
    els.drawerOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function handleKeyboard(e) {
    if (e.key === 'Escape') { closeDrawer(); return; }
    if (state.currentView === 'quiz' && state.answered && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      nextQuestion();
    }
    if (state.currentView === 'written' && document.activeElement !== els.wqInput && state.wqEvaluated && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      nextWrittenQuestion();
    }
    if (state.currentView === 'exams' && document.activeElement !== els.examInput && state.examEvaluated && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      nextExamQuestion();
    }
    if (state.currentView === 'flashcards') {
      if (e.key === 'ArrowLeft') changeFlashcard(-1);
      if (e.key === 'ArrowRight') changeFlashcard(1);
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); els.flashcard.classList.toggle('flipped'); }
    }
  }

  // ── Navigation ────────────────────────────────────────────
  function navigateTo(view) {
    state.currentView = view;
    els.navBtns.forEach((b) => b.classList.toggle('active', b.dataset.view === view));
    $$('.view').forEach((v) => v.classList.remove('active'));
    const viewEl = { home: els.viewHome, quiz: els.viewQuiz, written: els.viewWritten, exams: els.viewExams, flashcards: els.viewFlashcards }[view];
    if (viewEl) viewEl.classList.add('active');
    if (view === 'home') { updateHomeStats(); populateExamListHome(); }
    updateNavStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavStats() {
    const stats = getStats();
    const pct = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;
    els.statScoreValue.textContent = pct + '%';
    const total = getReviewList().length + getWrittenReviewList().length;
    els.statReviewValue.textContent = total;
  }

  function updateHomeStats() {
    const rl = getReviewList();
    els.revisionNumber.textContent = rl.length;
    els.btnStartRevision.disabled = rl.length === 0;

    const wrl = getWrittenReviewList();
    els.writtenRevisionNumber.textContent = wrl.length;
    els.btnStartWrittenRevision.disabled = wrl.length === 0;

    els.flashcardNumber.textContent = getAllFlashcards().length;
    const fl = getFcFailedList();
    els.fcFailedNumber.textContent = fl.length;
    els.btnStartFcRevision.disabled = fl.length === 0;
  }

  function populateExamListHome() {
    els.examListHome.innerHTML = '';
    EXAMS.forEach((exam) => {
      const item = document.createElement('div');
      item.className = 'exam-list-item';
      item.innerHTML = `
        <span class="exam-list-badge">${exam.id.toUpperCase()}</span>
        <span>${exam.title.split('—')[1]?.trim() || exam.title}</span>
        <span class="exam-list-count">${exam.questions.length}q</span>
      `;
      els.examListHome.appendChild(item);
    });
  }

  // ══════════════════════════════════════════════════════════
  //  QUIZ QCM
  // ══════════════════════════════════════════════════════════
  function startQuiz(mode) {
    state.quizMode = mode;
    state.currentQuestionIndex = 0;
    state.correctCount = 0;
    state.wrongCount = 0;
    state.answered = false;
    state.quizHistory = []; // Add history tracking for prev button

    if (mode === 'revision') {
      const ids = getReviewList();
      if (ids.length === 0) return;
      state.quizQuestions = shuffle(QUESTIONS.filter((q) => ids.includes(q.id)));
    } else {
      const s = shuffle(QUESTIONS);
      const c = state.selectedCount === 'all' ? s.length : Math.min(state.selectedCount, s.length);
      state.quizQuestions = s.slice(0, c);
    }

    els.quizContainer.classList.remove('hidden');
    els.quizResults.classList.add('hidden');
    navigateTo('quiz');
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.quizQuestions[state.currentQuestionIndex];
    if (!q) return showResults();
    const total = state.quizQuestions.length;
    const cur = state.currentQuestionIndex + 1;

    els.progressBar.style.width = ((cur / total) * 100) + '%';
    els.progressText.textContent = `${cur} / ${total}`;
    els.quizCategory.textContent = q.category;
    els.quizDifficulty.textContent = q.difficulty;
    els.quizDifficulty.setAttribute('data-level', q.difficulty);
    els.quizQuestionText.textContent = q.question;

    els.quizOptions.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span class="option-text">${escapeHtml(opt)}</span>`;
      btn.addEventListener('click', () => handleAnswer(i));
      els.quizOptions.appendChild(btn);
    });

    els.quizExplanation.classList.add('hidden');
    els.quizExplanation.classList.remove('correct-exp', 'wrong-exp');
    state.answered = false;
  }

  function handleAnswer(idx) {
    if (state.answered) return;
    state.answered = true;
    const q = state.quizQuestions[state.currentQuestionIndex];
    const ok = idx === q.correct;
    const btns = els.quizOptions.querySelectorAll('.option-btn');
    btns.forEach((b, i) => { b.classList.add('disabled'); if (i === q.correct) b.classList.add('correct'); if (i === idx && !ok) b.classList.add('wrong'); });

    const stats = getStats();
    stats.totalAnswered++;
    if (ok) {
      state.quizHistory[state.currentQuestionIndex] = true;
      state.correctCount++;
      stats.totalCorrect++;
      if (state.quizMode === 'revision') { const rl = getReviewList(); setReviewList(rl.filter((id) => id !== q.id)); }
    } else {
      state.quizHistory[state.currentQuestionIndex] = false;
      state.wrongCount++;
      const rl = getReviewList();
      if (!rl.includes(q.id)) { rl.push(q.id); setReviewList(rl); }
    }
    setStats(stats);
    updateNavStats();

    els.quizExplanation.classList.remove('hidden');
    els.quizExplanation.classList.add(ok ? 'correct-exp' : 'wrong-exp');
    els.explanationIcon.textContent = ok ? '✅' : '❌';
    els.explanationTitle.textContent = ok ? 'Bonne réponse !' : 'Mauvaise réponse';
    els.explanationText.textContent = q.explanation;

    els.btnNextQuestion.querySelector('span').textContent = state.currentQuestionIndex === state.quizQuestions.length - 1 ? 'Voir les résultats' : 'Question suivante';
    setTimeout(() => els.quizExplanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }

  function prevQuestion() {
    if (state.currentQuestionIndex > 0) {
      const wasCorrect = state.quizHistory[state.currentQuestionIndex - 1];
      if (wasCorrect !== undefined) {
        state.quizHistory[state.currentQuestionIndex - 1] = undefined;
        const stats = getStats();
        stats.totalAnswered--;
        if (wasCorrect) { state.correctCount--; stats.totalCorrect--; }
        else { state.wrongCount--; }
        setStats(stats);
        updateNavStats();
      }
      state.currentQuestionIndex--;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function nextQuestion() {
    state.currentQuestionIndex++;
    state.currentQuestionIndex >= state.quizQuestions.length ? showResults() : (renderQuestion(), window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function showResults() {
    els.quizContainer.classList.add('hidden');
    els.quizResults.classList.remove('hidden');
    const total = state.correctCount + state.wrongCount;
    const pct = total > 0 ? Math.round((state.correctCount / total) * 100) : 0;
    els.resultsIcon.textContent = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚';
    els.resultsTitle.textContent = pct >= 80 ? 'Excellent !' : pct >= 50 ? 'Pas mal !' : 'Continue à apprendre !';
    animateScoreCircle(els.scoreFill, els.scoreText, pct);
    els.resultsCorrect.textContent = state.correctCount;
    els.resultsWrong.textContent = state.wrongCount;
    els.btnResultsRetry.style.display = getReviewList().length > 0 ? 'flex' : 'none';
  }

  function animateScoreCircle(fillEl, textEl, pct) {
    textEl.textContent = pct + '%';
    const C = 2 * Math.PI * 52;
    const off = C - (pct / 100) * C;
    fillEl.style.transition = 'none';
    fillEl.style.strokeDashoffset = C;
    fillEl.getBoundingClientRect();
    fillEl.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
    fillEl.style.strokeDashoffset = off;
  }

  // ══════════════════════════════════════════════════════════
  //  WRITTEN QUIZ
  // ══════════════════════════════════════════════════════════
  function startWrittenQuiz(mode) {
    state.wqMode = mode;
    state.wqCurrentIndex = 0;
    state.wqCorrectCount = 0;
    state.wqWrongCount = 0;
    state.wqChecked = false;
    state.wqEvaluated = false;
    state.wqHistory = [];

    if (mode === 'revision') {
      const ids = getWrittenReviewList();
      if (ids.length === 0) return;
      state.wqQuestions = shuffle(WRITTEN_QUESTIONS.filter((q) => ids.includes(q.id)));
    } else {
      const s = shuffle(WRITTEN_QUESTIONS);
      const c = state.wqSelectedCount === 'all' ? s.length : Math.min(state.wqSelectedCount, s.length);
      state.wqQuestions = s.slice(0, c);
    }

    els.wqContainer.classList.remove('hidden');
    els.wqResults.classList.add('hidden');
    navigateTo('written');
    renderWrittenQuestion();
  }

  function renderWrittenQuestion() {
    const q = state.wqQuestions[state.wqCurrentIndex];
    if (!q) return showWrittenResults();
    const total = state.wqQuestions.length;
    const cur = state.wqCurrentIndex + 1;

    els.wqProgressBar.style.width = ((cur / total) * 100) + '%';
    els.wqProgressText.textContent = `${cur} / ${total}`;
    els.wqCategory.textContent = q.category;
    els.wqDifficulty.textContent = q.difficulty;
    els.wqDifficulty.setAttribute('data-level', q.difficulty);
    els.wqQuestionText.textContent = q.question;

    els.wqInput.value = '';
    els.wqAnswerArea.classList.remove('hidden');
    els.wqCorrection.classList.add('hidden');
    els.btnWqCorrect.classList.remove('active-correct');
    els.btnWqWrong.classList.remove('active-wrong');
    state.wqChecked = false;
    state.wqEvaluated = false;
    setTimeout(() => els.wqInput.focus(), 100);
  }

  function checkWrittenAnswer() {
    if (state.wqChecked) return;
    state.wqChecked = true;
    const q = state.wqQuestions[state.wqCurrentIndex];
    els.wqUserAnswer.textContent = els.wqInput.value.trim() || '(pas de réponse)';
    els.wqCorrectAnswer.textContent = q.answer;
    els.wqAnswerArea.classList.add('hidden');
    els.wqCorrection.classList.remove('hidden');
    setTimeout(() => els.wqCorrection.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }

  function evaluateWritten(ok) {
    if (state.wqEvaluated) return;
    state.wqEvaluated = true;
    const q = state.wqQuestions[state.wqCurrentIndex];
    const stats = getStats();
    stats.totalAnswered++;

    if (ok) {
      state.wqHistory[state.wqCurrentIndex] = true;
      state.wqCorrectCount++;
      stats.totalCorrect++;
      els.btnWqCorrect.classList.add('active-correct');
      const list = getWrittenReviewList();
      if (list.includes(q.id)) setWrittenReviewList(list.filter((id) => id !== q.id));
    } else {
      state.wqHistory[state.wqCurrentIndex] = false;
      state.wqWrongCount++;
      els.btnWqWrong.classList.add('active-wrong');
      const list = getWrittenReviewList();
      if (!list.includes(q.id)) { list.push(q.id); setWrittenReviewList(list); }
    }

    setStats(stats);
    updateNavStats();
    setTimeout(nextWrittenQuestion, 800);
  }

  function prevWrittenQuestion() {
    if (state.wqCurrentIndex > 0) {
      const wasCorrect = state.wqHistory[state.wqCurrentIndex - 1];
      if (wasCorrect !== undefined) {
        state.wqHistory[state.wqCurrentIndex - 1] = undefined;
        const stats = getStats();
        stats.totalAnswered--;
        if (wasCorrect) { state.wqCorrectCount--; stats.totalCorrect--; }
        else { state.wqWrongCount--; }
        setStats(stats);
        updateNavStats();
      }
      state.wqCurrentIndex--;
      renderWrittenQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function nextWrittenQuestion() {
    state.wqCurrentIndex++;
    state.wqCurrentIndex >= state.wqQuestions.length ? showWrittenResults() : (renderWrittenQuestion(), window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function showWrittenResults() {
    els.wqContainer.classList.add('hidden');
    els.wqResults.classList.remove('hidden');
    const total = state.wqCorrectCount + state.wqWrongCount;
    const pct = total > 0 ? Math.round((state.wqCorrectCount / total) * 100) : 0;
    els.wqResultsIcon.textContent = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚';
    els.wqResultsTitle.textContent = pct >= 80 ? 'Excellent !' : pct >= 50 ? 'Pas mal !' : 'Continue à apprendre !';
    animateScoreCircle(els.wqScoreFill, els.wqScoreText, pct);
    els.wqResultsCorrect.textContent = state.wqCorrectCount;
    els.wqResultsWrong.textContent = state.wqWrongCount;
    els.btnWqResultsRetry.style.display = getWrittenReviewList().length > 0 ? 'flex' : 'none';
  }

  // ══════════════════════════════════════════════════════════
  //  EXAMS
  // ══════════════════════════════════════════════════════════
  function showExamSelection() {
    els.examSelection.classList.remove('hidden');
    els.examContainer.classList.add('hidden');
    els.examResults.classList.add('hidden');

    els.examCards.innerHTML = '';
    EXAMS.forEach((exam) => {
      const card = document.createElement('div');
      card.className = 'exam-card';
      card.innerHTML = `
        <div class="exam-card-header">
          <span class="exam-card-title">${exam.title}</span>
          <div class="exam-card-meta">
            <span class="badge badge-type-exam">${exam.id.toUpperCase()}</span>
          </div>
        </div>
        <div class="exam-card-desc">${exam.description}</div>
        <div class="exam-card-footer">
          <span>📅 ${exam.date}</span>
          <span>⏱ ${exam.duration}</span>
          <span>👨‍🏫 ${exam.teacher}</span>
          <span>📋 ${exam.questions.length} questions</span>
        </div>
      `;
      card.addEventListener('click', () => startExam(exam));
      els.examCards.appendChild(card);
    });
  }

  function startExam(exam) {
    state.currentExam = exam;
    state.examQuestions = [...exam.questions];
    state.examCurrentIndex = 0;
    state.examCorrectCount = 0;
    state.examWrongCount = 0;
    state.examChecked = false;
    state.examEvaluated = false;
    state.examHistory = [];

    els.examSelection.classList.add('hidden');
    els.examContainer.classList.remove('hidden');
    els.examResults.classList.add('hidden');

    els.examBadge.textContent = exam.id.toUpperCase();
    els.examTimer.textContent = exam.duration;

    // Show/hide annexe
    if (exam.needsAnnexe) {
      els.examAnnexeSection.style.display = 'block';
    } else {
      els.examAnnexeSection.style.display = 'none';
    }

    renderExamQuestion();
  }

  function renderExamQuestion() {
    const q = state.examQuestions[state.examCurrentIndex];
    if (!q) return showExamResults();
    const total = state.examQuestions.length;
    const cur = state.examCurrentIndex + 1;

    els.examProgressBar.style.width = ((cur / total) * 100) + '%';
    els.examProgressText.textContent = `${cur} / ${total}`;

    els.examPoints.textContent = q.points ? `📊 ${q.points}` : '';
    els.examQuestionText.textContent = q.question;

    els.examInput.value = '';
    els.examAnswerArea.classList.remove('hidden');
    els.examCorrection.classList.add('hidden');
    els.btnExamCorrect.classList.remove('active-correct');
    els.btnExamWrong.classList.remove('active-wrong');
    state.examChecked = false;
    state.examEvaluated = false;
    setTimeout(() => els.examInput.focus(), 100);
  }

  function checkExamAnswer() {
    if (state.examChecked) return;
    state.examChecked = true;
    const q = state.examQuestions[state.examCurrentIndex];
    els.examUserAnswer.textContent = els.examInput.value.trim() || '(pas de réponse)';
    els.examCorrectAnswer.textContent = q.answer;
    els.examAnswerArea.classList.add('hidden');
    els.examCorrection.classList.remove('hidden');
    setTimeout(() => els.examCorrection.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }

  function evaluateExam(ok) {
    if (state.examEvaluated) return;
    state.examEvaluated = true;

    if (ok) {
      state.examHistory[state.examCurrentIndex] = true;
      state.examCorrectCount++;
      els.btnExamCorrect.classList.add('active-correct');
    } else {
      state.examHistory[state.examCurrentIndex] = false;
      state.examWrongCount++;
      els.btnExamWrong.classList.add('active-wrong');
    }

    setTimeout(nextExamQuestion, 800);
  }

  function prevExamQuestion() {
    if (state.examCurrentIndex > 0) {
      const wasCorrect = state.examHistory[state.examCurrentIndex - 1];
      if (wasCorrect !== undefined) {
        state.examHistory[state.examCurrentIndex - 1] = undefined;
        if (wasCorrect) state.examCorrectCount--;
        else state.examWrongCount--;
      }
      state.examCurrentIndex--;
      renderExamQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function nextExamQuestion() {
    state.examCurrentIndex++;
    state.examCurrentIndex >= state.examQuestions.length ? showExamResults() : (renderExamQuestion(), window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function showExamResults() {
    els.examContainer.classList.add('hidden');
    els.examResults.classList.remove('hidden');
    const total = state.examCorrectCount + state.examWrongCount;
    const pct = total > 0 ? Math.round((state.examCorrectCount / total) * 100) : 0;
    els.examResultsIcon.textContent = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📝';
    els.examResultsTitle.textContent = pct >= 80 ? 'Excellent !' : pct >= 50 ? 'Pas mal !' : 'Continue à réviser !';
    animateScoreCircle(els.examScoreFill, els.examScoreText, pct);
    els.examResultsCorrect.textContent = state.examCorrectCount;
    els.examResultsWrong.textContent = state.examWrongCount;
  }

  // ══════════════════════════════════════════════════════════
  //  FLASHCARDS
  // ══════════════════════════════════════════════════════════
  function startFlashcards(mode) {
    state.fcMode = mode;
    state.currentFlashcardIndex = 0;
    state.fcCorrectCount = 0;
    state.fcWrongCount = 0;
    state.fcEvaluated = false;

    const allCards = getAllFlashcards();

    if (mode === 'revision') {
      const ids = getFcFailedList();
      if (ids.length === 0) return;
      state.fcCards = shuffle(allCards.filter((f) => ids.includes(f.id)));
      els.fcTitle.textContent = 'Révision Flashcards';
    } else {
      state.fcCards = [...allCards];
      els.fcTitle.textContent = 'Flashcards SQL';
    }

    els.flashcardsContainer.classList.remove('hidden');
    els.fcResultsPanel.classList.add('hidden');
    navigateTo('flashcards');
    els.flashcard.classList.remove('flipped');
    renderFlashcard();
  }

  function renderFlashcard() {
    if (!state.fcCards.length) return;
    const fc = state.fcCards[state.currentFlashcardIndex];
    els.fcFrontContent.textContent = fc.front;
    els.fcBackContent.textContent = fc.back;
    els.fcCounter.textContent = `${state.currentFlashcardIndex + 1} / ${state.fcCards.length}`;
    els.fcCategory.textContent = fc.category || 'Général';
    els.fcDifficulty.textContent = fc.difficulty || 'moyen';
    els.fcDifficulty.setAttribute('data-level', fc.difficulty || 'moyen');
    // Badge custom
    const existingBadge = document.querySelector('.badge-custom-fc');
    if (existingBadge) existingBadge.remove();
    if (fc._custom) {
      const badge = document.createElement('span');
      badge.className = 'badge badge-custom badge-custom-fc';
      badge.textContent = '⭐ Importée';
      document.querySelector('.flashcard-meta').appendChild(badge);
    }

    state.fcEvaluated = false;
    els.fcEvalBar.classList.remove('evaluated');
    els.btnFcCorrect.classList.remove('selected', 'active-correct');
    els.btnFcWrong.classList.remove('selected', 'active-wrong');
  }

  function evaluateFlashcard(ok) {
    if (state.fcEvaluated) return;
    state.fcEvaluated = true;
    const fc = state.fcCards[state.currentFlashcardIndex];
    els.fcEvalBar.classList.add('evaluated');

    if (ok) {
      state.fcCorrectCount++;
      els.btnFcCorrect.classList.add('selected', 'active-correct');
      const fl = getFcFailedList();
      if (fl.includes(fc.id)) setFcFailedList(fl.filter((id) => id !== fc.id));
    } else {
      state.fcWrongCount++;
      els.btnFcWrong.classList.add('selected', 'active-wrong');
      const fl = getFcFailedList();
      if (!fl.includes(fc.id)) { fl.push(fc.id); setFcFailedList(fl); }
    }

    updateNavStats();
    setTimeout(() => {
      const next = state.currentFlashcardIndex + 1;
      if (next >= state.fcCards.length) {
        showFcResults();
      } else {
        els.flashcard.classList.remove('flipped');
        setTimeout(() => { state.currentFlashcardIndex = next; renderFlashcard(); }, 200);
      }
    }, 600);
  }

  function showFcResults() {
    els.flashcardsContainer.classList.add('hidden');
    els.fcResultsPanel.classList.remove('hidden');
    const total = state.fcCorrectCount + state.fcWrongCount;
    const pct = total > 0 ? Math.round((state.fcCorrectCount / total) * 100) : 0;
    els.fcResultsIcon.textContent = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚';
    els.fcResultsTitle.textContent = pct >= 80 ? 'Excellente maîtrise !' : pct >= 50 ? 'Bon travail !' : 'Continue de réviser !';
    els.fcResultsCorrect.textContent = state.fcCorrectCount;
    els.fcResultsWrong.textContent = state.fcWrongCount;
  }

  function changeFlashcard(dir) {
    if (!state.fcCards.length) return;
    els.flashcard.classList.remove('flipped');
    setTimeout(() => {
      state.currentFlashcardIndex += dir;
      if (state.currentFlashcardIndex < 0) state.currentFlashcardIndex = state.fcCards.length - 1;
      if (state.currentFlashcardIndex >= state.fcCards.length) state.currentFlashcardIndex = 0;
      renderFlashcard();
    }, 200);
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ══════════════════════════════════════════════════════════
  //  CSV IMPORT MODULE
  // ══════════════════════════════════════════════════════════

  let _parsedCards = null; // holds parsed cards before user confirms

  function openCsvModal() {
    _parsedCards = null;
    els.csvFileInput.value = '';
    els.csvResult.className = 'csv-result hidden';
    els.csvResult.textContent = '';
    els.btnImportConfirm.disabled = true;

    const custom = getCustomFlashcards();
    if (custom.length > 0) {
      els.csvCustomInfo.classList.remove('hidden');
      els.customFcCount.textContent = custom.length;
    } else {
      els.csvCustomInfo.classList.add('hidden');
    }

    els.csvModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeCsvModal() {
    els.csvModal.classList.add('hidden');
    document.body.style.overflow = '';
    _parsedCards = null;
  }

  /**
   * Robust CSV parser — handles quoted fields with embedded commas/newlines.
   * Returns array of objects keyed by header row.
   */
  function parseCSV(text) {
    const lines = [];
    let cur = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        if (inQuotes && text[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
        if (cur.trim() || lines.length) lines.push(cur);
        cur = '';
        if (ch === '\r' && text[i + 1] === '\n') i++;
      } else {
        cur += ch;
      }
    }
    if (cur.trim()) lines.push(cur);

    const splitLine = (line) => {
      const fields = [];
      let field = '';
      let q = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') { if (q && line[i+1] === '"') { field += '"'; i++; } else q = !q; }
        else if (c === ',' && !q) { fields.push(field.trim()); field = ''; }
        else field += c;
      }
      fields.push(field.trim());
      return fields;
    };

    if (lines.length < 2) return [];
    const headers = splitLine(lines[0]).map(h => h.toLowerCase().trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const vals = splitLine(lines[i]);
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = vals[idx] || ''; });
      rows.push(obj);
    }
    return rows;
  }

  function handleCsvFile(file) {
    if (!file) return;
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      showCsvResult('error', '❌ Ce fichier n\'est pas un CSV. Vérifie l\'extension (.csv).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = parseCSV(text);

      if (rows.length === 0) {
        showCsvResult('error', '❌ Fichier vide ou format invalide. Assure-toi d\'avoir une ligne d\'en-tête.');
        return;
      }

      // Validate: must have at least "front" and "back"
      const sample = rows[0];
      if (!('front' in sample) || !('back' in sample)) {
        showCsvResult('error', '❌ Colonnes requises manquantes : <strong>front</strong> et <strong>back</strong>.\nEn-tête trouvé : ' + Object.keys(sample).join(', '));
        return;
      }

      // Filter out empty rows
      const valid = rows.filter(r => r.front && r.back);
      const skipped = rows.length - valid.length;

      _parsedCards = valid.map((r, i) => ({
        id: 'csv_' + Date.now() + '_' + i,
        front: r.front,
        back: r.back,
        category: r.category || 'Général',
        difficulty: ['facile','moyen','difficile'].includes(r.difficulty) ? r.difficulty : 'moyen',
      }));

      const msg = `✅ <strong>${_parsedCards.length} carte${_parsedCards.length > 1 ? 's' : ''}</strong> prête${_parsedCards.length > 1 ? 's' : ''} à importer`
        + (skipped > 0 ? ` (${skipped} ligne${skipped > 1 ? 's' : ''} ignorée${skipped > 1 ? 's' : ''})` : '')
        + '.<br><em>Aperçu :</em> «&nbsp;' + escapeHtml(_parsedCards[0].front.slice(0, 60)) + (_parsedCards[0].front.length > 60 ? '…' : '') + '&nbsp;»';

      showCsvResult('success', msg);
      els.btnImportConfirm.disabled = false;
    };
    reader.readAsText(file, 'UTF-8');
  }

  function showCsvResult(type, html) {
    els.csvResult.className = 'csv-result ' + type;
    els.csvResult.innerHTML = html;
  }

  function confirmImport() {
    if (!_parsedCards || _parsedCards.length === 0) return;

    const existing = getCustomFlashcards();
    const merged = [...existing, ..._parsedCards];
    setCustomFlashcards(merged);

    showCsvResult('success', `🎉 <strong>${_parsedCards.length} carte${_parsedCards.length > 1 ? 's' : ''}</strong> importée${_parsedCards.length > 1 ? 's' : ''} ! Total : ${merged.length} cartes personnalisées.`);
    els.btnImportConfirm.disabled = true;
    els.customFcCount.textContent = merged.length;
    els.csvCustomInfo.classList.remove('hidden');
    _parsedCards = null;

    // Refresh stats
    updateHomeStats();
    els.csvFileInput.value = '';

    setTimeout(closeCsvModal, 1800);
  }

  function deleteCustomCards() {
    if (!confirm('Supprimer toutes les cartes importées ? Cette action est irréversible.')) return;
    setCustomFlashcards([]);
    els.csvCustomInfo.classList.add('hidden');
    els.customFcCount.textContent = '0';
    showCsvResult('success', '🗑 Toutes les cartes importées ont été supprimées.');
    updateHomeStats();
  }

  // ══════════════════════════════════════════════════════════
  //  BACKUP MODULE
  // ══════════════════════════════════════════════════════════
  function exportBackup() {
    const backupData = {
      version: 1,
      timestamp: new Date().toISOString()
    };
    for (const key of Object.values(STORAGE_KEYS)) {
      const val = localStorage.getItem(key);
      if (val !== null) backupData[key] = val;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dt = new Date();
    const dateStr = dt.toISOString().split('T')[0];
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `sqlmaster_sauvegarde_${dateStr}.json`);
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    document.body.removeChild(dlAnchorElem);
  }

  function importBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.version) throw new Error("Fichier de sauvegarde invalide");

        let imported = 0;
        for (const key of Object.values(STORAGE_KEYS)) {
          if (data[key] !== undefined) {
            localStorage.setItem(key, data[key]);
            imported++;
          }
        }

        if (imported > 0) {
          updateHomeStats();
          updateNavStats();
          alert(`✅ Progression restaurée avec succès ! (${imported} champs mis à jour).`);
        } else {
          alert('⚠️ Aucune donnée valide trouvée dans la sauvegarde.');
        }
      } catch (err) {
        console.error(err);
        alert('❌ Erreur: Le fichier fourni n\'est pas un fichier de sauvegarde SQLMaster valide.');
      }
      els.backupFileInput.value = ''; // reset
    };
    reader.readAsText(file);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
