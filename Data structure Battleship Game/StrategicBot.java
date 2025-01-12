import battleship.*;

import java.awt.Point;
import java.util.*;

/**
 * StrategicBot for the BattleShip game.
 * <p>
 * This bot implements a strategic approach to playing the BattleShip game by avoiding duplicate shots,
 * using probabilistic targeting, and systematically searching for and sinking ships.
 * </p>
 * <p>
 * Authorship:
 * This code was implemented by Mihirkumar Thakkar, Ruushi Shah and Harsh Goswami with the goal of achieving
 * an average score below 100 shots per game and completing 10,000 games in under 10 seconds.
 * Mihirkumar Thakkar: 000899548
 * Ruushi Shah: 000884229
 * Harsh Goswami: 000894310
 * </p>
 */
public class StrategicBot implements BattleShipBot {
    private BattleShip2 battleShip;
    private int gameSize;
    private Set<Point> shotsFired;
    private Random random;
    private Queue<Point> targetQueue;
    private List<Point> searchPattern;

    /**
     * Initializes the bot with the BattleShip game instance and sets up initial variables.
     *
     * @param b the BattleShip game instance
     */
    @Override
    public void initialize(BattleShip2 b) {
        battleShip = b;
        gameSize = b.BOARD_SIZE;
        shotsFired = new HashSet<>();
        random = new Random(0xAAAAAAAA); // Seed for reproducibility
        targetQueue = new LinkedList<>();
        searchPattern = generateSearchPattern();
    }

    /**
     * Generates a precomputed search pattern.
     *
     * @return the list of points in the search pattern
     */
    private List<Point> generateSearchPattern() {
        List<Point> pattern = new ArrayList<>();
        for (int x = 0; x < gameSize; x++) {
            for (int y = 0; y < gameSize; y++) {
                if ((x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)) {
                    pattern.add(new Point(x, y));
                }
            }
        }
        Collections.shuffle(pattern, random); // Shuffle to avoid deterministic patterns
        return pattern;
    }

    /**
     * Fires a shot at the calculated best position on the board.
     * This method is called repeatedly by the BattleShip API until all ships are sunk.
     */
    @Override
    public void fireShot() {
        Point shot;
        if (targetQueue.isEmpty()) {
            shot = getNextBestShot();
        } else {
            shot = targetQueue.poll();
        }

        if (shot != null && !shotsFired.contains(shot)) {
            shotsFired.add(shot);
            boolean hit = battleShip.shoot(shot);

            if (hit) {
                addSurroundingCellsToQueue(shot);
            }
        }
    }

    /**
     * Calculates the next best shot based on a probability heuristic.
     *
     * @return the point to shoot at, or null if no valid shot is found
     */
    private Point getNextBestShot() {
        for (Point p : searchPattern) {
            if (!shotsFired.contains(p)) {
                return p;
            }
        }
        return getRandomShot();
    }

    /**
     * Gets a random valid shot.
     *
     * @return a random valid point to shoot at
     */
    private Point getRandomShot() {
        Point shot;
        do {
            int x = random.nextInt(gameSize);
            int y = random.nextInt(gameSize);
            shot = new Point(x, y);
        } while (shotsFired.contains(shot));
        return shot;
    }

    /**
     * Adds the surrounding cells of a hit point to the target queue.
     *
     * @param hit the point that was hit
     */
    private void addSurroundingCellsToQueue(Point hit) {
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
        for (int[] dir : directions) {
            int newX = hit.x + dir[0];
            int newY = hit.y + dir[1];
            Point newPoint = new Point(newX, newY);
            if (isValidPoint(newPoint) && !shotsFired.contains(newPoint)) {
                targetQueue.add(newPoint);
            }
        }
    }

    /**
     * Checks if a point is within the valid bounds of the game board.
     *
     * @param p the point to check
     * @return true if the point is valid, false otherwise
     */
    private boolean isValidPoint(Point p) {
        return p.x >= 0 && p.x < gameSize && p.y >= 0 && p.y < gameSize;
    }

    /**
     * Returns the authorship information for this bot implementation.
     *
     * @return the authorship information
     */
    @Override
    public String getAuthors() {
        return "Mihirkumar Thakkar, Ruushi Shah and Harsh Goswami";
    }
}
