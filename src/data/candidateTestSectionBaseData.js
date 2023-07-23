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