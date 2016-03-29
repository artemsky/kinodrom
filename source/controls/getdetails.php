<?php
    declare(strict_types=1);
    
    class Template{
        protected $data;
        protected $template;
        protected $replaced;
        
        function __construct(string $dataUrl, string $templateUrl) {
           $this->data = json_decode(file_get_contents($dataUrl));
           $this->template = file_get_contents($templateUrl);
        }
        
        private function replace() {
            $patterns = array(
            '{{Title}}' => function () {
                return $this->data->Title;
            },
            '{{Poster}}' => function () {
                return '<img src="movies/'.$this->data->MovieID.'/poster.jpg" alt="'.$this->data->Title.'" class="img-responsive center-block">';
            },
            '{{SessionStart}}' => function () {
                return $this->data->SessionStarts;
            },
            '{{Year}}' => function () {
                return $this->data->Year;
            },
            '{{Country}}' => function () {
                return $this->data->Country;
            },
            '{{Genre}}' => function () {
                return $this->data->Genre;
            },
            '{{Budget}}' => function () {
                return $this->data->Budget;
            },
            '{{Time}}' => function () {
                return $this->data->Time;
            },
            '{{Translation}}' => function () {
                return $this->data->Lang;
            },
            '{{Actors}}' => function () {
                return $this->data->Actors;
            },
            '{{About}}' => function () {
                return $this->data->About;
            },
            '{{IFrame}}' => function () {
                return '<iframe class="trailer" width="380" height="180" src="https://www.youtube.com/embed/'
                .$this->data->Video
                .'?autohide=1&showinfo=0" frameborder="0" allowfullscreen></iframe>';
            },
            '{{MovieID}}' => function () {
                return $this->data->MovieID;
            },
            '{{Image1}}' => function () {
                return '<a href="movies/'.$this->data->MovieID.'/1.jpg" class="fancybox" title="'.$this->data->Title.'" rel="gallery">
                            <img src="movies/'.$this->data->MovieID.'/1.jpg" alt="'.$this->data->Title.'" class="fancy-image">
                        </a>';
            },
            '{{Image2}}' => function () {
                return '<a href="movies/'.$this->data->MovieID.'/2.jpg" class="fancybox" title="'.$this->data->Title.'" rel="gallery">
                            <img src="movies/'.$this->data->MovieID.'/2.jpg" alt="'.$this->data->Title.'" class="fancy-image">
                        </a>';
            },
            '{{Image3}}' => function () {
                return '<a href="movies/'.$this->data->MovieID.'/3.jpg" class="fancybox" title="'.$this->data->Title.'" rel="gallery">
                            <img src="movies/'.$this->data->MovieID.'/3.jpg" alt="'.$this->data->Title.'" class="fancy-image">
                        </a>';
            },
            '{{Image4}}' => function () {
                return '<a href="movies/'.$this->data->MovieID.'/4.jpg" class="fancybox" title="'.$this->data->Title.'" rel="gallery">
                            <img src="movies/'.$this->data->MovieID.'/4.jpg" alt="'.$this->data->Title.'" class="fancy-image">
                        </a>';
            },
            '{{Image5}}' => function ($match) {
                return '<a href="movies/'.$this->data->MovieID.'/5.jpg" class="fancybox" title="'.$this->data->Title.'" rel="gallery">
                            <img src="movies/'.$this->data->MovieID.'/5.jpg" alt="'.$this->data->Title.'" class="fancy-image">
                        </a>';
            }
        );
            $this->replaced = preg_replace_callback_array($patterns, $this->template);
        }
        
        public function GetResult() : string{
            $this->replace();
            return $this->replaced;
        }
    }

        
    $Replacer = new Template($_POST["data"], $_POST["template"]);
    echo $Replacer->GetResult();
    

    
    