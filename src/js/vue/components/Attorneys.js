export default {

    data:() => ({
        attorneys: [],
        pagination: {},
        loading: true,
        query: null,
        form: {
            name: '',
            practiceArea: '',
            location: '',
            letter: ''
        }
    }),

    /**
     * The component has been created by Vue.
     */
    created() {
        this.query = URI(document.URL).query(true);

        if (this.query.name) {
            this.form.name = this.query.name;
        }

        if (this.query.practiceArea) {
            this.form.practiceArea = this.query.practiceArea;
        }

        if (this.query.location) {
            this.form.location = this.query.location;
        }

        if (this.query.letter) {
            this.form.letter = this.query.letter;
        }

        this.getAttorneys();
    },

    methods: {

        /**
         * Get Attorneys from Craft
         */
         getAttorneys() {
            this.$http.get('/json/attorneys', this.form)
                .then((response) => {
                    this.loading = false;
                    this.$set('attorneys', response.data.data);
                    this.$set('pagination', response.data.meta.pagination);
                });
        },

        /**
         * Load More Attorneys
         */
        loadMore() {
            this.$http.get(this.pagination.links.next)
                .then((response) => {
                    this.attorneys.push(...response.data.data);
                    this.$set('pagination', response.data.meta.pagination);
                });
        }

    }

}
