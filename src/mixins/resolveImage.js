const mixin = {
  methods: {
    resolveImage (type) {
      switch (type) {
        case 'grass':
          return 'grass_type.png'
        case 'poison':
          return 'poison-type.png' 
        case 'fire':
          return 'fire_type.png'
        case 'flying':
          return 'fly-type.png'
        case 'water':
          return 'water_type.png'
        case 'bug':
          return 'bug-type.png'
        case 'normal':
          return 'normal-type.png'
        case 'ground':
          return 'ground_type.png'
        case 'electric':
          return 'electric_type.png'
        case 'fairy':
          return 'fairy-type.png'
        case 'fighting':
          return 'figth-type.png'
        case 'psychic':
          return 'psy-type.png'
        case 'rock':
          return 'rock-type.png'
        case 'steel':
          return 'steel-type.png'
        case 'ice':
          return 'ice-type.png'
        case 'ghost':
          return 'ghost-type.png'
        case 'dragon':
          return 'dragon-type.png'
        default:
          return ''
      }
    },
  }
}
  
export default mixin
  