<script>
import { Line } from "vue-chartjs/legacy"; // 2버전
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
// import { Chart, registerables } from 'chart.js'
// Chart.register(...registerables)

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
    },
    options: {
      type: Object,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
};
</script>

<style></style>
