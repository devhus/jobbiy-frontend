import moment from "moment";

export const dateFormats = {
  methods: {
    formatDateAgo(dateString: string) {
      return moment(new Date(dateString), "YYYYMMDD").fromNow()
    },
    formatDate(dateString: string, format: string) {
      return moment(new Date(dateString)).format(format)
    }
  }
}

export default dateFormats;