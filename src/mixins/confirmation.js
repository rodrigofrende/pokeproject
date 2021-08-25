const mixin = {
    methods: {
      async showConfirmationBox (msg) {
        const h = this.$createElement
        // Using HTML string
        const titleVNode = h('div', {
          domProps: { innerHTML: 'Sacar del equipo ?' },
          class: ['text-capitalize']
        })
        // More complex structure
        // const icon = h('i', {
        //   class: ['fal fa-exclamation-circle mx-auto'],
        //   style: { fontSize: '5rem' }
        // })
  
        const text = h('h5', { class: ['py-3 font-text'] }, msg.text || msg)
        const messageVNode = h('div', { class: ['row'] },
          [
            // h('div', { class: ['col-12 pt-2'] }, [icon]),
            h('div', { class: ['col-12 pt-2'] }, [text])
          ])
  
        const confirmation = await this.$bvModal.msgBoxConfirm([messageVNode], {
          title: [titleVNode],
          buttonSize: 'lg',
          centered: true,
          okVariant: 'col order-2 mx-1',
          okTitle: msg.okTitle || 'Confirmar',
          cancelVariant: 'col order-1',
          cancelTitle: msg.cancelTitle || 'Cancelar',
          footerClass: 'row py-3 justify-content-between',
          modalClass: 'game-font',
          bodyClass: 'text-center'
        })
  
        return confirmation
      }
    }
  }
  
  export default mixin
  