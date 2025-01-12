import battleship.BattleShip2;

/**
 * Main class for COMP10205 - Assignment#6 - Version 2 of BattleShip
 * <p>
 * This class initializes the BattleShip game with a custom bot implementation
 * and runs the game for a specified number of iterations to evaluate the bot's performance.
 * </p>
 * <p>
 * Authorship:
 *  * This code was implemented by Mihirkumar Thakkar, Ruushi Shah and Harsh Goswami with the goal of achieving
 *  * an average score below 100 shots per game and completing 10,000 games in under 10 seconds.
 *  * Mihirkumar Thakkar: 000899548
 *  * Ruushi Shah: 000884229
 *  * Harsh Goswami: 000894310
 * </p>
 * <p>
 *
 * </p>
 */
public class BattleShipMain {
    public static void main(String[] args) {
        final int NUMBER_OF_GAMES = 10000;
        System.out.println(BattleShip2.getVersion());
        BattleShip2 battleShip = new BattleShip2(NUMBER_OF_GAMES, new StrategicBot());
        int[] gameResults = battleShip.run();

        // Analysis code to look at all the game scores that are returned in gameResults.
        // This can be useful for debugging purposes.
        battleShip.reportResults();
    }
}
