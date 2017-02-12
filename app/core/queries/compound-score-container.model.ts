import {Similarity} from "../../shared/model/media/similarity.model";
import {Feature} from "../../shared/model/features/feature.model";
/**
 * This class defines an abstract container for compound scores, i.e. scores that are obtained as a result of multiple
 * sub-scores. It defines some basic methods that can be invoked for such a CompoundScoreContainer.
 *
 * Note: The class is used to build a ScoreContainer hierarchy for research-results returned by Cineast. For every MediaObject
 * (e.g. a video) a MediaObjectScoreContainer is created. That container in turn hosts a list of SegmentScoreContainer's,
 * which again host a set of Similarity objects (raw scores).
 *
 * Both containers are able to derive a score for themselves based on the sub-entities they host. These scores are used
 * to rank the research-results in the UI.
 */
export abstract class CompoundScoreContainer {
    /** Score value. How it is obtained is up to the implementing class. */
    protected score : number = 0;

    /**
     * Adds a Similarity object to the CompoundScoreContainer. Usually, that object is somehow used to influence,
     * change the score of the Container.
     *
     * @param category Category for which to add the similarity value.
     * @param similarity Similarity value
     */
    public abstract addSimilarity(category : Feature, similarity : Similarity) : void;


    /**
     * Can be used to update the score given a list of of weights. The weight are used to
     * weigh the scores based on the
     *
     * @param features List of features that should be used to calculate the score.
     */
    public abstract update(features: Feature[]) : void;

    /**
     * Getter for the container's score.
     */
    public getScore() : number {
        return this.score;
    };

    /**
     * Getter for the container's score as percent value.
     */
    public getScorePercentage() : number {
        return Math.round(this.getScore() * 1000)/10
    }

    /**
     * Static comparator method. Compares two ScoreContainers so that they
     * are sorted in a descending order. Can be used with Array.prototype.sort();
     */
    public static compareDesc (a : CompoundScoreContainer , b : CompoundScoreContainer) {
        if (a.getScore() < b.getScore()) {
            return -1;
        }
        if (a.getScore() > b.getScore()) {
            return 1;
        }

        return 0;
    }

    /**
     * Static comparator method. Compares two ScoreContainers so that they
     * are sorted in a ascending order. Can be used with Array.prototype.sort();
     */
    public static compareAsc (a : CompoundScoreContainer , b : CompoundScoreContainer) {
        if (a.getScore() > b.getScore()) {
            return -1;
        }
        if (a.getScore() < b.getScore()) {
            return 1;
        }

        return 0;
    }
}