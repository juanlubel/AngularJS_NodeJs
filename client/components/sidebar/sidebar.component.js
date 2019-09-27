class SidebarComponent {
    constructor() {
        this.showContact = true
        this.showChat = false
        this.showPhone = false
    }

    show(tag) {
        switch (tag) {
            case 'contact':
                this.showContact = true
                this.showChat = false
                this.showPhone = false
                break
            case 'chat':
                this.showContact = false
                this.showChat = true
                this.showPhone = false
                break
            case 'phone':
                this.showContact = false
                this.showChat = false
                this.showPhone = true
                break

        }
    }
}

let sidebarComponent = {
    controller: SidebarComponent,
    templateUrl: 'components/sidebar/sidebar.html'
}

export default sidebarComponent
