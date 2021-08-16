import Page from '../components/page.js'

export default {
  name: 'day',
  template:
  `<page title="Day">
    <div class="card flex center between p-16 mb-16">
      <span class="material-icons-round">chevron_left</span>
      <h2 class="h3 m-0">Jan 1st 2021</h2>
      <span class="material-icons-round">chevron_right</span>
    </div>
    <div class="card p-16 mb-16">
      <h3>Flow</h3>
      <p>No notes available</p>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Symptoms</h3>
      <ul class="link-list m-0">
        <li><router-link to=""><span class="material-icons-round">arrow_right</span>Lorem Ipsum</router-link></li>
        <li><router-link to=""><span class="material-icons-round">arrow_right</span>Dolor Sit</router-link></li>
        <li><router-link to=""><span class="material-icons-round">add</span>Add Symptom</router-link></li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Notes</h3>
      <ul class="link-list m-0">
        <li><router-link to=""><span class="material-icons-round">arrow_right</span>Lorem Ipsum</router-link></li>
        <li><router-link to=""><span class="material-icons-round">add</span>Add Note</router-link></li>
      </ul>
    </div>
    <div class="card mb-16">
      <h3 class="p-16 pb-0 m-0">Medication</h3>
      <ul class="link-list m-0">
        <li><router-link to=""><span class="material-icons-round">arrow_right</span>Lorem Ipsum</router-link></li>
        <li><router-link to=""><span class="material-icons-round">add</span>Add Medication</router-link></li>
      </ul>
    </div>
    <ul class="card link-list m-0">
      <li><router-link to=""><span class="material-icons-round">favorite</span>Intercourse</router-link></li>
      <li><router-link to=""><span class="material-icons-round">pregnant_woman</span>Pregnancy</router-link></li>
    </ul>
  </page>`,
  components: {
    Page
  }
}
