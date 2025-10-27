// Navigation Component (Local Component)
const NavigationComponent = {
    template: `
        <nav class="navbar navbar-expand-lg navbar-light">
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item" v-for="(item, index) in navItems" :key="index">
                        <a class="nav-link" :href="item.href">{{ item.name }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    data() {
        return {
            navItems: [
                { name: 'Home', href: '#' },
                { name: 'Recipes', href: '#' },
                { name: 'Lifestyles', href: '#' },
                { name: 'Videos', href: '#' },
                { name: 'About', href: '#' }
            ]
        };
    }
};

// Featured Image Component (Local Component)
const FeaturedImageComponent = {
    props: {
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: 180
        }
    },
    template: `
        <div class="featured-image-wrapper">
            <img
                :src="src"
                :alt="alt"
                :width="width"
                class="img-fluid"
            >
        </div>
    `
};

// Blog Post Component (Global Component)
Vue.component('blog-post', {
    props: {
        author: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        postId: {
            type: Number,
            required: true
        },
        foodieLevel: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showPopover: false
        };
    },
    methods: {
        togglePopover(event) {
            this.showPopover = !this.showPopover;
            if (this.showPopover) {
                this.$nextTick(() => {
                    const popover = this.$refs.popover;
                    if (popover) {
                        popover.focus();
                    }
                });
            }
        },
        closePopover() {
            this.showPopover = false;
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.closePopover();
                this.$refs.profileImage.focus();
            }
        },
        handleOutsideClick(event) {
            if (this.$refs.popover && !this.$refs.popover.contains(event.target) &&
                !this.$refs.profileImage.contains(event.target)) {
                this.closePopover();
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    template: `
        <div class="post">
            <div class="post-header">
                <img
                    :src="profileImage"
                    alt="Profile picture"
                    class="profile-image"
                    ref="profileImage"
                    @click="togglePopover"
                    @keydown.enter="togglePopover"
                    @keydown.space.prevent="togglePopover"
                    tabindex="0"
                    role="button"
                    :aria-label="'View profile of ' + author"
                />
                <span class="author">{{ author }}</span> —
                <span class="date">{{ date }}</span>
                <span class="reply">REPLY</span>
            </div>
            <p>{{ comment }}</p>

            <div
                v-if="showPopover"
                ref="popover"
                class="author-popover"
                role="dialog"
                :aria-modal="false"
                :aria-labelledby="'author-' + postId"
                tabindex="-1"
                @keydown="handleKeydown"
            >
                <button
                    class="popover-close"
                    @click="closePopover"
                    aria-label="Close"
                >×</button>
                <h3 :id="'author-' + postId" class="popover-title">{{ author }}</h3>
                <div class="popover-meta">Foodie Level: {{ foodieLevel }}</div>
                <div class="popover-bio">
                    <strong>Bio:</strong>
                    <p>{{ bio }}</p>
                </div>
            </div>
        </div>
    `
});

// Main Vue Instance
new Vue({
    el: '#container',
    components: {
        'navigation-menu': NavigationComponent,
        'featured-image': FeaturedImageComponent
    },
    data: {
        blogTitle: 'Food Blog',
        commentsTitle: 'Comments',
        featuredImage: {
            src: 'images/chili.jpg',
            alt: 'White Chicken Chili',
            width: 180
        },
        posts: [
            {
                id: 1,
                author: 'Brianna',
                date: 'February 18, 2021 @ 3:30 pm',
                comment: 'Was amazing! My Walmart didn\'t have coriander in stock and didn\'t have ground cumin. I used serrano instead of jalapeño. It was just like my favorite tortilla soup from BJs. I am sending this recipe to my family. I want everyone to try it!',
                foodieLevel: 'Novice',
                bio: 'Food enthusiast. Love to cook and experiment. Into only organic, fat free, sugar free stuffs!',
                profileImage: 'images/profile.png'
            },
            {
                id: 2,
                author: 'LINH',
                date: 'February 15, 2021 @ 9:46 am',
                comment: 'I just made this soup today and it\'s so tasty! didn\'t have corn at home but still turned out very good.  It\'s a winner!  I made beef chili for my parents; but since my dad has gout he can\'t eat beef; this white chicken chili is perfect for him.  Thank you Lisa!',
                foodieLevel: 'Newcomer',
                bio: 'Love food! Grew up with meat and potatoes. Recently venture outside my comfort zone. Loving everything I have been eating so far. Thai is my favorite at this time.',
                profileImage: 'images/profile.png'
            },
            {
                id: 3,
                author: 'CATHERINE LEONARDO',
                date: 'February 13, 2021 @ 12:58 pm',
                comment: 'I LOVE this White Chicken Chili! You are right, it is satiating meal—delicious with toasted bread. Refreshingly different taste than any chicken chili I\'ve made in the past. I made it exactly as written and added some chopped zucchini, carrots, and celery. Instead of shredding the chicken, I chopped it into small pieces. It freezes very well. Will be an all-time favorite, for sure.',
                foodieLevel: 'Mentor',
                bio: 'I have to say I never was the adventurous type until 2 years ago. My boyfriend, who is of Japanese background, exposed me to other cultural food and I have never look back since!',
                profileImage: 'images/profile.png'
            },
            {
                id: 4,
                author: 'KALI',
                date: 'February 13, 2021 @ 11:31 am',
                comment: 'This recipe is dynamite! My partner usually won\'t eat beans but he finished the whole pot (darn was hoping to have some for leftovers haha). This is crowd-pleaser that I am going to add to my regular recipe rotation. Thanks so much, Lisa',
                foodieLevel: 'Novice',
                bio: 'Food is my passion. So is cooking. I love to experiment and try new things. I have to admit I\'m a food whore! Invite me over for dinner and I\'ll be there!',
                profileImage: 'images/profile.png'
            }
        ]
    }
});
