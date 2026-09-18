export type WritingSection = {
  title: string;
  items: string[];
};

export type UsefulLanguageGroup = {
  title: string;
  phrases: string[];
};

export type WritingEntry = {
  slug: "essay" | "proposal" | "report" | "review" | "letter";
  title: string;
  examPart: "Part 1" | "Part 2";
  required: boolean;
  wordCount: string;
  register: string;
  purpose: string;
  mentalTemplate: string;
  summary: string;
  structure: WritingSection[];
  tips: string[];
  traps: string[];
  usefulLanguage: UsefulLanguageGroup[];
  checklist: string[];
  exampleTask: string;
  exampleAnswer: string;
};

export const writingExamOverview = {
  duration: "1 hour 30 minutes",
  tasks: "2 tasks",
  wordCount: "220–260 words per task",
  criteria: ["Content", "Communicative Achievement", "Organisation", "Language"],
  note: "Part 1 is a compulsory essay. In Part 2 you choose one task from an email/letter, report, proposal or review.",
};

export const writingGeneralChecklist = [
  "Answer every point in the task and avoid irrelevant information.",
  "Keep the register consistent with the target reader.",
  "Use the layout expected for the task: paragraphs, headings or bullet points where appropriate.",
  "Show a range of vocabulary and grammatical structures instead of repeating safe language.",
  "Paraphrase the wording from the task rather than copying it.",
  "Link ideas clearly within paragraphs and between paragraphs.",
  "Check grammar, spelling and punctuation separately before finishing.",
];

export const writingEntries: WritingEntry[] = [
  {
    slug: "essay",
    title: "Essay",
    examPart: "Part 1",
    required: true,
    wordCount: "220–260 words",
    register: "Semi-formal / academic, objective and balanced",
    purpose: "Discuss two ideas from the notes, evaluate them and decide which is more important or effective.",
    mentalTemplate: "Context → Idea 1 + support → Idea 2 + support → reasoned judgement",
    summary: "The compulsory C1 task. Build an argument rather than listing opinions: select two points, support each with reasons or examples, compare them and reach a logical conclusion.",
    structure: [
      {
        title: "1. Introduction",
        items: [
          "Briefly introduce the issue and explain why it matters or why there is debate around it.",
          "Do not give the final conclusion immediately.",
          "Paraphrase the task instead of copying its wording.",
        ],
      },
      {
        title: "2. Main paragraph 1",
        items: [
          "Develop the first chosen point.",
          "State one clear main idea and support it with a reason, consequence or specific example.",
        ],
      },
      {
        title: "3. Main paragraph 2",
        items: [
          "Develop the second chosen point with the same depth.",
          "Compare or contrast it with the first where useful so the essay feels like one argument.",
        ],
      },
      {
        title: "4. Conclusion",
        items: [
          "State your final opinion clearly.",
          "Explain which of the two options is more important/effective and why.",
          "Summarise; do not introduce a completely new argument.",
        ],
      },
    ],
    tips: [
      "Plan before writing: choose the two points, the main claim for each paragraph and the evidence you will use.",
      "Keep a balanced approach even if you strongly prefer one option.",
      "Use specific examples or evidence to support claims.",
      "Use a range of linking adverbials and conjunctions so the logic is easy to follow.",
      "Save your clearest personal judgement for the final paragraph.",
    ],
    traps: [
      "Starting with 'I think...' and revealing the conclusion in line one.",
      "Discussing all three notes instead of selecting two.",
      "Turning each paragraph into unsupported opinion.",
      "Copying phrases from the task input word for word.",
      "Using bullet points or an informal conversational tone.",
    ],
    usefulLanguage: [
      {
        title: "Introducing the issue",
        phrases: [
          "It is often argued that ...",
          "There is growing concern about ...",
          "Few would dispute that ...",
          "The question of whether ... remains controversial.",
        ],
      },
      {
        title: "Developing and contrasting",
        phrases: [
          "While it is true that ..., it is also worth considering ...",
          "A further point to consider is ...",
          "Nevertheless, this approach has one important limitation.",
          "Not only would this ..., but it could also ...",
        ],
      },
      {
        title: "Giving a final judgement",
        phrases: [
          "On balance, I would argue that ...",
          "Taking everything into consideration, ...",
          "In my view, the more effective approach would be ...",
          "Ultimately, ... is likely to have the greater impact.",
        ],
      },
    ],
    checklist: [
      "Did I discuss exactly two of the notes?",
      "Does each main paragraph contain a clear main point and support?",
      "Is the tone semi-formal and objective?",
      "Did I use my own wording?",
      "Does the conclusion clearly answer which option is more important/effective?",
    ],
    exampleTask: "Your class has discussed how colleges can improve students' wellbeing. Write an essay discussing two of these ideas: more sports facilities, mental-health workshops, flexible timetables. Explain which would be more effective and give reasons for your opinion.",
    exampleAnswer: `Student wellbeing has become an increasingly important issue as academic pressure and financial concerns place greater demands on young adults. Colleges can respond in several ways, but any measure should improve students' daily experience rather than simply create the appearance of support.

One possible approach would be to invest in better sports facilities. Regular exercise can reduce stress, improve concentration and create opportunities for students to socialise outside the classroom. This is particularly valuable for those who spend long hours studying. However, improved facilities would mainly benefit students who are already willing to exercise, while others might never use them.

A broader solution would be to introduce practical mental-health workshops. These could teach students how to recognise excessive stress, organise their workload and seek help before a problem becomes serious. Such sessions would be relatively inexpensive and could reach almost every student. Admittedly, a workshop cannot replace professional support, but it can provide useful strategies and reduce the stigma surrounding mental health.

On balance, both measures would be worthwhile, yet mental-health workshops are likely to have the greater overall impact. Sports facilities can improve wellbeing for many students, but workshops would equip a much wider group with skills they could use throughout their studies and beyond.`,
  },
  {
    slug: "proposal",
    title: "Proposal",
    examPart: "Part 2",
    required: false,
    wordCount: "220–260 words",
    register: "Semi-formal to formal, usually impersonal",
    purpose: "Analyse a need or problem and recommend a practical plan for future action.",
    mentalTemplate: "Purpose → Current need/background → Options → Recommendations + expected result",
    summary: "A forward-looking action plan. Use clear headings, explain what should change and persuade the reader that your recommendations are realistic and worthwhile.",
    structure: [
      {
        title: "1. Introduction / Purpose",
        items: [
          "State immediately why the proposal has been written.",
          "Identify the situation, audience or decision the proposal is intended to support.",
        ],
      },
      {
        title: "2. Background / Needs",
        items: [
          "Summarise the current problem, evidence or needs.",
          "Keep this section shorter than the recommendations: a proposal looks mainly to the future.",
        ],
      },
      {
        title: "3. Suggestions / Options",
        items: [
          "Present concrete actions under clear headings.",
          "Explain how each action would solve the identified problem or create a benefit.",
        ],
      },
      {
        title: "4. Recommendations",
        items: [
          "Prioritise the best course of action.",
          "Finish with a concise sentence explaining the likely positive result if the proposal is adopted.",
        ],
      },
    ],
    tips: [
      "Brainstorm ideas first, then group them under headings before drafting.",
      "Use headings such as Introduction, Current situation, Recommendations or Expected benefits.",
      "A few bullet points are useful, but overusing them limits the language you can demonstrate.",
      "Use passive forms, reporting verbs, speculation and recommendation structures to sound appropriately formal.",
      "If the task describes an unfamiliar situation, invent plausible details as long as they remain relevant.",
    ],
    traps: [
      "Writing it like an essay with no headings.",
      "Spending most of the answer describing the current situation instead of future action.",
      "Using contractions or chatty phrases such as 'I think it'd be great if...'.",
      "Making recommendations without explaining why they would work.",
      "Adding too many bullet-point lists.",
    ],
    usefulLanguage: [
      {
        title: "Stating the purpose",
        phrases: [
          "The principal aim of this proposal is to ...",
          "This proposal is intended to ...",
          "The purpose of this proposal is to assess ... and recommend ...",
        ],
      },
      {
        title: "Presenting background",
        phrases: [
          "Feedback from students suggests that ...",
          "A number of concerns have been raised regarding ...",
          "Following a recent survey, it became clear that ...",
        ],
      },
      {
        title: "Recommendations",
        phrases: [
          "It is recommended that ...",
          "A further measure would be to ...",
          "The most viable option would appear to be ...",
          "If these recommendations are implemented, ...",
        ],
      },
    ],
    checklist: [
      "Is the purpose clear in the opening lines?",
      "Have I used headings to organise the proposal?",
      "Is most of the answer focused on future action and recommendations?",
      "Have I explained the benefit of each recommendation?",
      "Is the register consistently semi-formal/formal and mostly impersonal?",
    ],
    exampleTask: "Your college wants to help new students settle in more quickly. Write a proposal outlining the main difficulties new students face and suggesting ways the college could support them.",
    exampleAnswer: `Proposal: Helping new students settle in

Introduction
The purpose of this proposal is to identify the main difficulties experienced by students during their first weeks at college and to recommend practical measures that could help them adapt more quickly.

Current difficulties
Feedback from first-year students suggests that two issues are particularly common. Firstly, many students find it difficult to meet people outside their own classes. Secondly, essential information about clubs, academic support and college services is spread across several websites and is therefore easy to miss.

Suggested measures
A peer-mentoring scheme would provide each new student with a second-year volunteer who could answer practical questions during the first month. In addition, a single online welcome hub should be created containing timetables, support contacts, maps and information about societies.

Recommendations
It is recommended that the college introduce both measures at the beginning of the next academic year. The mentoring scheme would provide personal support, while the online hub would make reliable information easier to access. A short welcome event could also be held during the first week so that mentors and new students can meet face to face.

If these recommendations are implemented, new students should feel more connected and better informed from the start, which is likely to improve both their confidence and their overall college experience.`,
  },
  {
    slug: "report",
    title: "Report",
    examPart: "Part 2",
    required: false,
    wordCount: "220–260 words",
    register: "Formal and impersonal",
    purpose: "Describe and assess a current situation, report findings and make evidence-based recommendations.",
    mentalTemplate: "Purpose → Findings/current situation → Interpretation → Recommendations",
    summary: "A factual, reader-friendly document based mainly on present circumstances. Organise findings under headings, report evidence clearly and end with recommendations that logically follow from those findings.",
    structure: [
      {
        title: "1. Introduction",
        items: [
          "State the aim of the report.",
          "If relevant, briefly explain how the information was obtained: survey, interviews, observation, questionnaire, etc.",
        ],
      },
      {
        title: "2. Findings / Current situation",
        items: [
          "Report the most relevant results using precise, formal language.",
          "Use proportions, invented but plausible statistics or reported opinions where useful.",
        ],
      },
      {
        title: "3. Problems / Analysis",
        items: [
          "Interpret what the findings mean rather than simply listing them.",
          "Compare groups or contrasting results if the task requires it.",
        ],
      },
      {
        title: "4. Recommendations",
        items: [
          "Begin the final section with a brief overall judgement.",
          "Recommend actions based directly on the evidence in the previous sections.",
        ],
      },
    ],
    tips: [
      "Use headings to plan and structure the report before you start writing.",
      "Use a formal, impersonal style and vary the way you refer to respondents or participants.",
      "Statistics can be invented if the task does not provide them, provided they are plausible and relevant.",
      "Use bullet points selectively, especially in the recommendation section.",
      "Reports give more space to the current situation than proposals do.",
    ],
    traps: [
      "Making the report look like an essay.",
      "Using personal, conversational language throughout.",
      "Listing data without explaining its significance.",
      "Forgetting one of the specific areas requested in the task.",
      "Using bullet points in several sections and losing opportunities to show complex language.",
    ],
    usefulLanguage: [
      {
        title: "Purpose and method",
        phrases: [
          "The principal aim of this report is to assess ...",
          "This report presents the results of ...",
          "A survey was conducted among ...",
          "Respondents were asked to comment on ...",
        ],
      },
      {
        title: "Reporting findings",
        phrases: [
          "A significant proportion of respondents stated that ...",
          "Nearly three quarters of those surveyed ...",
          "The findings indicate a clear preference for ...",
          "By contrast, only a small minority ...",
        ],
      },
      {
        title: "Recommendations",
        phrases: [
          "In light of these findings, ... would appear to be the most effective option.",
          "It is therefore recommended that ...",
          "There should be an immediate review of ...",
          "Unless these measures are introduced, it is unlikely that ...",
        ],
      },
    ],
    checklist: [
      "Did I state the purpose of the report immediately?",
      "Are the findings organised under clear headings?",
      "Have I reported evidence rather than relying on personal opinion?",
      "Do the recommendations follow logically from the findings?",
      "Is the style formal and impersonal?",
    ],
    exampleTask: "Your college library wants to know how students use its facilities. Write a report describing current use, identifying any problems and recommending improvements.",
    exampleAnswer: `Report on the use of the college library

Introduction
The principal aim of this report is to assess how students currently use the college library and to identify improvements that could make the facilities more effective. Information was gathered through an online questionnaire completed by 126 students.

Current use
Approximately two thirds of respondents visit the library at least twice a week. Quiet study areas are by far the most frequently used facilities, while fewer than one third regularly borrow printed books. A significant proportion of students also use the library computers between classes.

Main problems
The most common complaint concerned the shortage of quiet seats during examination periods. Students also reported that group discussions sometimes take place in areas intended for silent study. By contrast, the group-study rooms are often fully booked despite being left empty for part of the reserved period.

Recommendations
Overall, the library is well used, but the available space could be managed more efficiently. It is therefore recommended that:
• additional silent-study desks be introduced during examination periods;
• group rooms be released automatically if students do not arrive within fifteen minutes;
• clearer signs be used to separate collaborative and silent areas.

These measures would address the main concerns raised by respondents without requiring major changes to the building.`,
  },
  {
    slug: "review",
    title: "Review",
    examPart: "Part 2",
    required: false,
    wordCount: "220–260 words",
    register: "Engaging and reader-focused; usually neutral to semi-formal",
    purpose: "Inform and evaluate so the target reader can decide whether something is worth seeing, reading, visiting or buying.",
    mentalTemplate: "Hook + context → Key features → Evaluation → Clear recommendation",
    summary: "A review is not a plot summary. Give enough context to orient the reader, evaluate specific features using precise vocabulary and finish with a recommendation tailored to the audience in the task.",
    structure: [
      {
        title: "1. Opening / Hook",
        items: [
          "Identify what you are reviewing and give the reader a reason to continue.",
          "A question or striking judgement can create interest immediately.",
        ],
      },
      {
        title: "2. Background / Key features",
        items: [
          "Give essential context: genre, creator, setting, purpose or basic premise.",
          "For a film/book, summarise the premise without revealing the ending.",
        ],
      },
      {
        title: "3. Evaluation",
        items: [
          "Discuss what works and what does not.",
          "Use specific vocabulary for the medium: plot, cast, dialogue, soundtrack, setting, exhibits, performance, etc.",
        ],
      },
      {
        title: "4. Recommendation",
        items: [
          "Give an explicit final judgement.",
          "Relate the recommendation to the target audience from the task.",
        ],
      },
    ],
    tips: [
      "Think first about what the review must help the reader decide.",
      "Mix factual information with clear evaluative language.",
      "Use sentence adverbs and varied evaluative adjectives to make your voice engaging.",
      "If comparing two works, make the comparison explicit rather than writing two unrelated mini-reviews.",
      "Use medium-specific vocabulary to demonstrate lexical range.",
    ],
    traps: [
      "Retelling the whole story.",
      "Giving away the ending of a film or book.",
      "Forgetting to make a final recommendation.",
      "Using only vague adjectives such as good, bad, nice or interesting.",
      "Ignoring one of the specific features or comparisons requested in the task.",
    ],
    usefulLanguage: [
      {
        title: "Background and description",
        phrases: [
          "Set in ..., the film tells the story of ...",
          "The novel explores the themes of ...",
          "The exhibition brings together ...",
          "At first glance, ... appears to be ..., but ...",
        ],
      },
      {
        title: "Evaluation",
        phrases: [
          "The strongest aspect of ... is ...",
          "The dialogue is sharp and convincing, although ...",
          "What makes the production particularly effective is ...",
          "Unfortunately, the pace becomes increasingly predictable.",
        ],
      },
      {
        title: "Recommendation",
        phrases: [
          "I would definitely recommend ... to anyone who ...",
          "This is well worth seeing, particularly if ...",
          "Despite its flaws, ... is likely to appeal to ...",
          "I would strongly advise readers to give this one a miss.",
        ],
      },
    ],
    checklist: [
      "Have I informed the reader without over-summarising?",
      "Did I evaluate specific features, not just say whether I liked it?",
      "Have I used vocabulary specific to the type of work/event?",
      "Did I avoid spoilers?",
      "Is there a clear final recommendation for the target reader?",
    ],
    exampleTask: "Your college magazine wants reviews of podcasts that could help students improve their English. Review one podcast, explaining its strengths and weaknesses and saying who would benefit most from it.",
    exampleAnswer: `Can a twenty-minute podcast really improve your English on the way to college? "Everyday Ideas" comes surprisingly close. Each episode takes one ordinary topic, from sleep to online shopping, and explores it through a relaxed conversation between two presenters.

The programme's greatest strength is its natural but accessible language. The hosts speak at a realistic pace, yet they regularly rephrase difficult ideas and use examples to make their meaning clear. The topics are also broad enough to introduce useful vocabulary without sounding like a traditional lesson. Particularly helpful is the short final section in which the presenters return to several expressions used earlier in the episode.

There are, however, a few weaknesses. Some episodes spend too long on personal anecdotes, and advanced learners may occasionally find the explanations rather basic. In addition, there are no exercises, so listeners need to make their own notes if they want to study actively.

Despite these limitations, I would definitely recommend "Everyday Ideas" to B2 and early C1 students who want more exposure to natural spoken English. It will not replace a coursebook, but as regular listening practice it is engaging, practical and easy to fit into a busy day.`,
  },
  {
    slug: "letter",
    title: "Letter",
    examPart: "Part 2",
    required: false,
    wordCount: "220–260 words",
    register: "Depends on the reader: formal, semi-formal or informal",
    purpose: "Respond directly to a specific reader, covering all required points with the right tone and conventions.",
    mentalTemplate: "Correct opening → Reason for writing → Task points in paragraphs → Desired outcome / natural closing",
    summary: "The key challenge is tone. A formal letter needs clear purpose, relevant information and conventional opening/closing phrases; an informal letter or email should sound natural and personal without becoming careless.",
    structure: [
      {
        title: "Formal letter",
        items: [
          "Open with Dear + title/name when known; otherwise use Dear Sir or Madam.",
          "State the reason for writing immediately.",
          "Use one paragraph per main task point and link the paragraphs clearly.",
          "In the final paragraph, state the result or response you hope to receive.",
          "Use Yours sincerely when the person's name is known; Yours faithfully when it is not.",
        ],
      },
      {
        title: "Informal letter / email",
        items: [
          "Open naturally and explain why you are writing or replying.",
          "Respond to every point in the message and expand on your advice, news or suggestions.",
          "Use paragraphs even though the tone is informal.",
          "Close by referring naturally to future contact.",
          "Use an informal sign-off such as All the best, Best wishes or Love depending on the relationship.",
        ],
      },
    ],
    tips: [
      "Identify the reader before you write: the same content can require completely different language depending on who receives it.",
      "Only include information that helps answer the task; relevance is especially important in formal letters.",
      "Formal letters benefit from indirect language, passive forms and polite requests.",
      "Informal writing can use contractions and personal language, but it still needs organisation and accurate grammar.",
      "Do not simply repeat the wording of the input message or announcement.",
    ],
    traps: [
      "Using Yours faithfully after addressing a named person, or Yours sincerely after Dear Sir or Madam.",
      "Mixing an informal opening with highly formal language later in the letter.",
      "Including interesting but irrelevant information and going over the word limit.",
      "Writing one long block instead of clear paragraphs.",
      "Ending an informal message with Yours sincerely/faithfully.",
    ],
    usefulLanguage: [
      {
        title: "Formal opening and purpose",
        phrases: [
          "Dear Ms Patel, / Dear Sir or Madam,",
          "I am writing with regard to ...",
          "I am writing in response to ...",
          "I have been asked to contact you concerning ...",
        ],
      },
      {
        title: "Formal closing",
        phrases: [
          "I very much hope you will consider ...",
          "I look forward to hearing your views on ...",
          "I look forward to receiving your response.",
          "Yours sincerely, / Yours faithfully,",
        ],
      },
      {
        title: "Informal language",
        phrases: [
          "It was great to hear from you.",
          "I thought I'd drop you a line to ...",
          "Why don't we ...?",
          "Can't wait to hear what you decide.",
          "All the best, / Best wishes,",
        ],
      },
    ],
    checklist: [
      "Who is the reader and what level of formality is appropriate?",
      "Is my opening compatible with my closing?",
      "Have I answered every point in the task?",
      "Is every paragraph relevant to the purpose of the letter/email?",
      "Have I clearly stated the desired outcome or next step?",
    ],
    exampleTask: "You attend a language school that wants to join an international student-exchange website. Write a formal letter to the website coordinator explaining what the school offers, why it would be a good partner and what kind of students would benefit from studying there.",
    exampleAnswer: `Dear Ms Rahman,

I am writing on behalf of Riverside Language Centre regarding your international student-exchange website. We would be very interested in having our school included among the institutions available to visiting students.

Riverside specialises in intensive English courses from B1 to C1 level, with particular emphasis on speaking and exam preparation. All teachers are fully qualified, and students receive individual feedback as well as weekly conversation workshops. The school also offers a study centre that remains open in the evenings, which is particularly useful for students staying with host families.

We believe Riverside would be a strong partner because language learning is combined with regular cultural activities. Each month the school organises local visits, discussion events and day trips, giving international students frequent opportunities to use English outside the classroom. A dedicated welfare adviser is also available to help with accommodation and practical matters.

The school would be especially suitable for motivated students who want an intensive course but also wish to experience everyday life in an English-speaking environment. Both university-age learners and working adults would benefit from the flexible timetable.

I very much hope you will consider Riverside for inclusion on the website, and I look forward to hearing from you.

Yours sincerely,
Alex Morgan`,
  },
];

export function getWritingEntry(slug: string) {
  return writingEntries.find((entry) => entry.slug === slug);
}
