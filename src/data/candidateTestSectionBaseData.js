export const candidateTestSectionBaseData = {
    testName:'',
    testType:'',
    managedBy:
    {
        name:'Agent',
        _isMcq:true,
        _isDisabled:true
    },
    screeningType:'Pre Interview',
    totalQuestions:'',
    randomQuestions:
    {
        totalQuestions:'',
        totalMcq:0,
        totalProgramming:0,
        totalDescriptive:0,
        technology:{ technology1 : { } },
        questions:[]
    },
    predefinedQuestions:
    {
        totalQuestions:'',
        questions:[],
        technology:[
            { label: 'Python', value: 'Python' },
            { label: 'java', value: 'java' },
            { label: 'php', value: 'php' }
        ],
        questionType:[],
        selectedQuestion:[]
    },
}