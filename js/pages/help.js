import Page from '../components/page.js'

export default {
  name: 'help',
  template:
  `<page title="Help">
    <h2>Period Prediction</h2>
    <p>
      To predict future periods the app calculates your average period and cycle length based on the periods you have entered.
      This allows for accurate predictions in the case of regular cycles that do not fluctuate too much.
    </p>
    <h2>Fertility</h2>
    <p>
      Your fertile window is calculated by subtracting two weeks from the end of your cycle to get the day you ovulate.
      Typically women are fertile from three days before until two days after ovulation.
    </p>
  </page>`,
  components: {
    Page
  }
}
