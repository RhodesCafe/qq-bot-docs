module.exports = {
    base: '/wiki/',
    title: '罗德文档',
    description: '高效摸鱼指南',
    head: [
        ['link', {rel: 'icon', href: '/rdoc.ico'}],
    ],
    themeConfig: {
        nav: [
            {text: '主页', link: '/'},
            {text: '文档', link: '/docs/'},
            {text: "FAQ", link: "/faq"},
            {text: "SDK", link: "/sdk"},
            {text: "BOT", link: "/bot"},
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
                ['/docs/guide/', '教程'],
                {
                    title: '第三方',
                    path: '/docs/third/',
                    children: [
                        ['/docs/third/open_source_protocol.html', '开源协议简介'],
                        ['/docs/third/domains.html', '顶级域名一览'],
                        ['/docs/third/apply_md.html', '如何申请md']
                    ]
                },
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
        lastUpdated: '上次更新',
        logo: '/rdoc.ico',
        repo: 'RhodesCafe/qq-bot-docs',
        repoLabel: 'Github',
        editLinks: true,
        editLinkText: '在GitHub上编辑此页',
        docsBranch: 'main',
        docsDir: 'docs'
    },
    plugins:
        [
            '@vuepress/back-to-top',
            '@vuepress/last-updated',
            'fulltext-search',
            [
                'one-click-copy', // 代码块复制按钮
                {
                    copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
                    copyMessage: 'Copied！',
                    duration: 1000,
                    showInMobile: false,
                },
            ],
            [
                '@vuepress/pwa',
                {
                    serviceWorker: true,
                    updatePopup: {
                        '/': {
                            message: '发现新内容可用~',
                            buttonText: '刷新',
                        },
                    },
                },
            ],
            [
                'vuepress-plugin-right-anchor',
                {
                    showDepth: 1,
                    expand: {
                        trigger: 'hover',
                        clickModeDefaultOpen: true,
                    },
                },
            ],
        ],
    markdown:
        {
            lineNumbers: true
        }
    ,
    dest: 'wiki',
    host:
        'localhost',
    port:
        8080
}