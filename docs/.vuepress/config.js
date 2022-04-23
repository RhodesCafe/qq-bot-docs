module.exports = {
    base: '/wiki/',
    title: '罗德文档',
    description: '共建良好开发生态',
    themeConfig: {
        nav: [
            {text: '主页', link: '/'},
            {text: '文档', link: '/docs/'},
            {text: "FAQ", link: "/faq"},
            {text: "SDK", link: "/sdk"},
            {text: "资源", link: "/resource/"},
            {
                text: "关于", items: [
                    {text: '站点简介', link: '/about/index.html'},
                    {text: '添加内容', link: '/about/contact.html'}
                ]

            },
            {text: '更新日志', link: '/update'}
        ],
        sidebar: {
            '/docs/': [
                ['/docs/', '官方'],
                ['/docs/third.html', '第三方'],
                ['/docs/other.html', '其他']
            ],
            '/resource/': [
                ['/resource/', '导航'],
                {
                    title: '接口',
                    collapsable: false,
                    children: [
                        ['/resource/api/qq-miniprogram-secheck.html', '内容安全检查']
                    ]
                },
                {
                    title: '文件',
                    collapsable: false,
                    children: [
                        ['/resource/file/creator-ability-lesson.html', '开发者赋能直播课堂']
                    ]
                }
            ]
        },
        logo: '/rdoc.ico.png',
        repo: 'RhodesCafe/qq-bot-docs',
        repoLabel: 'Github',
        docsDir: 'docs'
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/last-updated',
        'fulltext-search'
    ],
    dest: 'dist',
    host: 'localhost',
    port: 8080
}