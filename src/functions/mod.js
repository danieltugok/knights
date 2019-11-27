function getMod ( value ) {
        
    if (value >= 0 && value <=8) {
        return -2

    } else if (value >= 9 && value <= 10) {
        return -1
    
    } else if (value >= 11 && value <= 12) {
        return 0

    } else if (value >= 13 && value <= 15) {
        return 1
    
    } else if (value >= 16 && value <= 18) {
        return 2
    
    } else if (value >= 19 && value <= 20) {
        return 3
    }

    return null;


}

export default getMod;