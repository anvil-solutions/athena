import PageTabBar from '../../components/page-tab-bar.js'

export default {
  name: 'account',
  template:
  `<page-tab-bar>
    <div class="flex mb-32 space">
      <span id="profile-icon" class="material-icons-round accent">account_circle</span>
    </div>
    <ul class="link-list card">
      <li><router-link to="/account/app"><span class="material-icons-round">settings</span>App Settings</router-link></li>
      <li><router-link to="/account/backup-and-restore"><span class="material-icons-round">settings_backup_restore</span>Backup And Restore</router-link></li>
      <li><router-link to="/account/help"><span class="material-icons-round">help</span>Help</router-link></li>
      <li><router-link to="/account/about"><span class="material-icons-round">info</span>About</router-link></li>
      <li><a rel="nofollow noopener noreferrer" target="_blank" href="https://anvil-solutions.com/en/imprint"><span class="material-icons-round">policy</span>Imprint</a></li>
      <li><a rel="nofollow noopener noreferrer" target="_blank" href="https://anvil-solutions.com/en/privacy"><span class="material-icons-round">policy</span>Privacy</a></li>
    </ul>
  </page-tab-bar>`,
  components: {
    PageTabBar
  }
}
